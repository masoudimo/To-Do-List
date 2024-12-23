import { Todo, TSaveDataIsStorage } from '../types'

export const saveDataIsStorage = ({
  targetStorageName,
  value,
}: TSaveDataIsStorage) => {
  try {
    if (!value) return

    const prevData = window.localStorage.getItem(targetStorageName)
    if (prevData) {
      const items = JSON.parse(prevData)
      return window.localStorage.setItem(
        targetStorageName,
        JSON.stringify([...items, value]),
      )
    } else
      return window.localStorage.setItem(
        targetStorageName,
        JSON.stringify([value]),
      )
  } catch (err) {
    return err
  }
}

export const getDataInStorage = <T>(targetStorageName: string): T | null => {
  if (!targetStorageName) return null
  const item = window.localStorage.getItem(targetStorageName)
  return item ? JSON.parse(item) : null
}

export const filterItemInStorage = ({
  targetStorageName,
  id,
}: {
  targetStorageName: string
  id: number
}) => {
  const items: Todo[] = getDataInStorage<Todo[]>(targetStorageName) || []
  const filterItem = items.filter((todo) => todo.id !== id)
  window.localStorage.setItem(targetStorageName, JSON.stringify(filterItem))
}
