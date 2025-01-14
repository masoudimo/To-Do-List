// eslint-disable-next-line
function setToLocalStorage(key: string, value: any): void {
  try {
    const valueToStore = JSON.stringify(value)
    localStorage.setItem(key, valueToStore)
  } catch (error) {
    console.error('some error occurs on add to LS', error)
  }
}

function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('some error occurs on remove from LS', error)
  }
}

function getFromLocalStorage<T>(key: string): T | null {
  try {
    const storedValue = localStorage.getItem(key)
    if (storedValue === null) {
      return null // Return null if the item doesn't exist
    }

    return JSON.parse(storedValue) // Parse the stored value back to its original form
  } catch (error) {
    console.error('Error reading from localStorage', error)
    return null
  }
}

export { setToLocalStorage, removeFromLocalStorage, getFromLocalStorage }
