import React, { useState } from 'react'
import './App.css'
import { Todo } from './types/types'
import useLocalStorageHandler from './hooks/useLocalStorageHandler'

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Build a Todo App' },
  ])
  const [add, remove] = useLocalStorageHandler('')
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
      }
      setTodos([...todos, newTodo])
      add(todos)
      setInputValue('')
    }
  }

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
    remove(todos.find((todo) => todo.id === id))
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
          <li key={todo.id}>
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
