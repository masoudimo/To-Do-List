import { Todo } from "../types/todo";

export default function debounce<T extends (...args: [Todo[]]) => void>(func: T, delay: number): T {
  let timeout: number | undefined;
  return ((...args: [Todo[]]) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => func(...args), delay);
  }) as T;
}
