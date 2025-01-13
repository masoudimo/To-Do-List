import React, { useEffect, useState } from 'react'
import './App.css'
import { Todo } from './types/types'
import useLocalStorageHandler from './hooks/useLocalStorageHandler'

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([])
  const { add, read } = useLocalStorageHandler()
  const [inputValue, setInputValue] = useState('') 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  useEffect(() => {
    const sync = async () => {
      const syncTodos = await read()
      if (syncTodos.data) {
        setTodos(syncTodos.data)
      }
    }
    sync()
  }, [])

  useEffect(() => {
    const adder = async (clear: Boolean) => {
      await add(todos, clear)
    }
    todos.length ? adder(true) : adder(false)
  }, [todos])

  const handleAddTodo = async () => {
    if (inputValue.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
      }
      setInputValue('')
      setTodos([...todos, newTodo])
    }
  }

  const handleDeleteTodo = async (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div className="App">
      <h1>Todo App</h1>

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
        {todos.length > 0 &&
          todos.map((todo) => (
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
