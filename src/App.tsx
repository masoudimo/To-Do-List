import React, { useState, useEffect } from 'react'
import './App.css'

interface Todo {
  id: number
  text: string
}

const KEY_LOCAL_STORAGE = 'todo_test'

const getTodoFromLocalStorage = () => {
  const todoList = localStorage.getItem(KEY_LOCAL_STORAGE)
  if (todoList) return JSON.parse(todoList || '[]') as Todo[]
  return []
}

const setTodoListOnStorage = (todo: Todo[]) => {
  localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(todo))
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    // { id: 1, text: 'Learn React' },
    // { id: 2, text: 'Build a Todo App' },
  ])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    setTodos(getTodoFromLocalStorage())
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSetOnLocalStorage = (todoList: Todo[]) => {
    setTimeout(() => {
      setTodoListOnStorage(todoList)
    }, 3000)
  }

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
      }
      const newList = [...todos, newTodo]
      setTodos(newList)
      handleSetOnLocalStorage(newList)
      setInputValue('')
    }
  }

  const handleDeleteTodo = (id: number) => {
    const newList = todos.filter((todo) => todo.id !== id)
    setTodos(newList)
    handleSetOnLocalStorage(newList)
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
