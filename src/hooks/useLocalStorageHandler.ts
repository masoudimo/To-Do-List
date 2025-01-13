import { Todo } from '../types/types'

const useLocalStorageHandler = (val: Todo | Todo[]) => {
  const add = (val: Todo | Todo[]) => {
    setTimeout(() => {
      if (Array.isArray(val)) {
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

  return [add, remove]
}

export default useLocalStorageHandler
