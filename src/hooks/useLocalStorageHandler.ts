import { Todo } from '../types/types'

const useLocalStorageHandler = (val: Todo | Todo[] | String) => {
  const add = (val: Todo | Todo[]) => {
    setTimeout(() => {
      if (Array.isArray(val)) {
        localStorage.clear()
        val.map((v) => {
          localStorage.setItem(String(v.id), v.text)
        })
      } else {
        localStorage.setItem(String(val.id), val.text)
      }
    }, 3000)
  }
  const remove = (val: Todo) => {
    setTimeout(() => {
      localStorage.removeItem(String(val.id))
    }, 3000)
  }

  const read = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const localStorageLength = localStorage.length
        let todos = []
        for (let i = 0; i < localStorageLength; i++) {
          todos.push(localStorage.key(i))
        }
        resolve(todos)
      }, 3000)
    })
  }

  return [add, remove, read]
}

export default useLocalStorageHandler
