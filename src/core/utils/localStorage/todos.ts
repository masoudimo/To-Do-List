import { getFromLocalStorage, setToLocalStorage } from '.'
import { Todo } from '../../types/todos'

const getToDosFrLS = (): Todo[] => {
  const data = getFromLocalStorage('toDos')
  if (data) return data as Todo[]
  return []
}
const setToDosInLS = (todoList: Todo[]) => {
  setToLocalStorage('toDos', todoList)
}

export { getToDosFrLS, setToDosInLS }
