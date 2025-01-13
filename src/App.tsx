import React, { useEffect, useState } from 'react'
import './App.css'
import { Todo } from './types/todo'
import debounce from './utils/debounce'


const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')

  const saveToLocalStorage = debounce((todos: Todo[]) => {
    todos.forEach((todo) => {
      localStorage.setItem(`todo_${todo.id}`, todo.text)
    })
  }, 3000)

  useEffect(() => {
    const savedTodos: Todo[] = Object.keys(localStorage)
      .filter((key) => key.startsWith('todo_'))
      .map((key) => {
        const id = parseInt(key.replace('todo_', ''), 10)
        const text = localStorage.getItem(key) || ''
        return { id, text }
      })
    setTodos(savedTodos)
  }, [])

  useEffect(() => {
    saveToLocalStorage(todos)
  }, [todos, saveToLocalStorage])

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
    localStorage.removeItem(`todo_${id}`) 
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

export default App;