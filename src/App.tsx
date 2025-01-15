import type React from 'react'
import { useEffect, useState } from 'react'
import useDebounce from './utils/useDebounce' 
import './App.css'
import { defaultTodos } from './data/initialvalues'
import type { Todo } from './types/todo.types'

const App: React.FC = () => {
  const storedTodos = localStorage.getItem('todos')
  const initialTodos: Todo[] = (() => {
    try {
      return storedTodos ? JSON.parse(storedTodos) : defaultTodos
    } catch (error) {
      console.error('Error parsing todos from localStorage:', error)
      return defaultTodos
    }
  })()

  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [inputValue, setInputValue] = useState('')

  const debouncedTodos = useDebounce(todos, 3000, initialTodos)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(debouncedTodos))
  }, [debouncedTodos])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
      }
      setTodos((prevTodos) => [...prevTodos, newTodo])
      setInputValue('')
    }
  }

  const handleDeleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
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
          type="button"
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
              type="button"
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
