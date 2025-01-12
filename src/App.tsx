import React, { useState } from 'react'
import './App.css'
import { usePersistTodoList } from './hooks/usePersistTodoList'

export interface Todo {
  id: number
  text: string
}

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('')
  const { todos, setTodos } = usePersistTodoList([
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Build a Todo App' },
  ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSendToLocalStorage = (todoList: Todo[]) => {
    setTimeout(() => {
      localStorage.setItem('todoList', JSON.stringify(todoList))
    }, 3000)
  }

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
      }
      const newTodoList = [...todos, newTodo]
      setTodos(newTodoList)
      handleSendToLocalStorage(newTodoList)
      setInputValue('')
    }
  }

  const handleDeleteTodo = (id: number) => {
    const newTodoList = todos.filter((todo) => todo.id !== id)
    setTodos(newTodoList)
    handleSendToLocalStorage(newTodoList)
  }

  return (
    <div className="App">
      <h1>UU Todo App</h1>

      <div>
        <input
          type="text"
          placeholder="Add a new todo..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          onClick={handleAddTodo}
          style={{ backgroundColor: '#007bff', color: 'white' }}
        >
          Add Todo
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ backgroundColor: 'red', color: 'white' }}>
            <span>{todo.text}</span>
            <button
              className="delete-btn"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
