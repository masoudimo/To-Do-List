import React, { useEffect, useState } from 'react'
import './App.css'
import {
  filterItemInStorage,
  getDataInStorage,
  saveDataIsStorage,
} from './utils/storage'
import { Todo } from './types'

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
      }

      setInputValue('')
      setLoading(true)
      const timer = setTimeout(() => {
        saveDataIsStorage({
          targetStorageName: 'todos',
          value: newTodo,
        })
        setTodos([...todos, newTodo])
        setLoading(false)
        clearTimeout(timer)
      }, 3000)
    }
  }

  useEffect(() => {
    const items = getDataInStorage<Todo[]>('todos')
    if (items) {
      setTodos(items)
    }
  }, [])

  const handleDeleteTodo = (id: number) => {
    filterItemInStorage({ targetStorageName: 'todos', id })
    setTodos(todos.filter((todo) => todo.id !== id))
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
          {loading ? 'loading' : 'Add Todo'}
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span className="todo-text">{todo.text}</span>
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
