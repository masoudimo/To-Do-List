import { Todo } from '../types/types'

type promiseType = {
  status: 'ok'
  data?: Todo[]
}

const useLocalStorageHandler = () => {
  const add = (val: Todo[], clear: Boolean) => {
    return new Promise<promiseType>((resolve) => {
      setTimeout(() => {
        if (clear) {
          localStorage.clear()
        }
        val.map((v) => {
          localStorage.setItem(String(v.id), v.text)
        })
      }, 3000)
      resolve({ status: 'ok' })
    })
  }

  const read = () => {
    return new Promise<promiseType>((resolve) => {
      setTimeout(() => {
        const localStorageLength = localStorage.length
        let todos = []
        for (let i = 0; i < localStorageLength; i++) {
          todos.push({
            id: Number(localStorage.key(i)),
            text: String(localStorage.getItem(String(localStorage.key(i)))),
          })
        }
        resolve({ status: 'ok', data: todos })
      }, 3000)
    })
  }

  return { add, read }
}

export default useLocalStorageHandler
