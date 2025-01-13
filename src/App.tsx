import React, { useEffect, useState } from 'react'
import './App.css'

interface Todo {
  id: number
  text: string
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')


  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodos(storedTodos);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    debugger;
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
      }
      setTodos([...todos, newTodo])
      setInputValue('');
      setOnLocalStorage(newTodo)
    }
  }

  const setOnLocalStorage = (newTodo: Todo) => {
    const localStorageData = JSON.parse(localStorage.getItem("todos") || "[]");
    localStorageData.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(localStorageData));
  }

  const handleDeleteTodo = (id: number) => {
    const localStorageData = JSON.parse(localStorage.getItem("todos") || "[]");
    const updatedLocalStorage = localStorageData.filter((todo: Todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(updatedLocalStorage));
    setTodos(updatedLocalStorage);
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
          onKeyDown={handleKeyPress}

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
