import { Todo } from '../types/types'

const useALocalStorageHandler = (val: Todo | Todo[]) => {
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
  
  
}

export default useLocalStorageHandler
