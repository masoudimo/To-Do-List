import { useState } from 'react'
import { Todo } from '../App'

export const usePersistTodoList = (initialTodos?: Todo[]) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const todoList = localStorage.getItem('todoList')
    return todoList ? JSON.parse(todoList) : initialTodos || []
  })

  return { todos, setTodos }
}
