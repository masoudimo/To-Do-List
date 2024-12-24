import React, { useEffect, useState } from 'react'
import './App.css'

interface Todo {
  id: number
  text: string
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todo')
    try {
      return savedTodos ? JSON.parse(savedTodos) : []
    } catch {
      localStorage.removeItem('todo')
      return []
    }
  })

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
      setInputValue('')
    }
  }

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todos))
  }, [todos])

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
          <li key={todo.id} style={{ color: '#000' }}>
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
