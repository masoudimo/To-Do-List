import { useEffect, useState } from 'react'

function useDebounce<T>(value: T, delay: number, initialValue: T): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
export default useDebounce
