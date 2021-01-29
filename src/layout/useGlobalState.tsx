import { useEffect, useState } from 'preact/hooks'

export default function useGlobalState<T>(uniqueName: string, initialState: T) {
  return function _useState(): [T, (next: T) => void] {
    const [val, _setVal] = useState<T>(initialState)
    useEffect(listenForChange, [])
    return [val, setVal]

    function setVal(next: T) {
      window.dispatchEvent(new CustomEvent(uniqueName, { detail: next }))
    }
    function listenForChange() {
      window.addEventListener(uniqueName, handleEvent)
      return () => window.removeEventListener(uniqueName, handleEvent)

      function handleEvent(e: Event) {
        _setVal((e as CustomEvent).detail)
      }
    }
  }
}