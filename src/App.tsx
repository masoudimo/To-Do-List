import React, { useEffect, useState } from 'react'
import './App.css'
import { Todo } from './core/types/todos'
import { vanillaDebounce } from './core/utils/vanilaDebounce'
import { getToDosFrLS, setToDosInLS } from './core/utils/localStorage/todos'

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')
  const [mounting, setMounting] = useState(true)

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

  const debounceSetStorage = vanillaDebounce(setToDosInLS, 3000)
  //for first initial
  const getDataFromLocalStorage = () => {
    const data = getToDosFrLS()
    console.log('test', data)

    if (data) {
      setTodos(data)
    }
    if (mounting) {
      setMounting(false)
    }
  }
  useEffect(getDataFromLocalStorage, [mounting])

  //  for any changes to sync
  useEffect(() => {
    if (todos && !mounting) debounceSetStorage(todos)
  }, [todos, debounceSetStorage, mounting])

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
            <span style={{ color: 'black' }}>{todo.text}</span>
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
