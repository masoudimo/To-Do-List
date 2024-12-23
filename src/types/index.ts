export interface Todo {
  id: number
  text: string
}

export type TSaveDataIsStorage = {
  targetStorageName: string
  value: Todo
}
