import { useEffect, useState } from 'preact/hooks'

export default function useLocalStorageFactory<T>(uniqueName: string, initialVal: T) {
  return function useLocalStorage(): [T, (next: T) => void] {
    const [state, _setState] = useState<T>(retrieve())
    useEffect(listenForChange, [])
    return [state, setState]

    function listenForChange() {
      window.addEventListener(uniqueName, handleEvent)
      return () => window.removeEventListener(uniqueName, handleEvent)

      function handleEvent(e: Event) {
        const next = (e as CustomEvent).detail as T
        _setState(next)
      }
    }
  }
  function retrieve(): T {
    const  ls = localStorage.getItem(uniqueName)
    return ls ? JSON.parse(ls) : initialVal
  }
  function setState(next: T) {
    window.dispatchEvent(new CustomEvent(uniqueName, { detail: next }))
    return localStorage.setItem(uniqueName, JSON.stringify(next))
  }
}