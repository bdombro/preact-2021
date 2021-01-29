
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

export default function useMedia (query: string) {
  const [state, setState] = useState(window.matchMedia(query).matches)

  useEffect(() => {
    let mounted = true
    const mql = window.matchMedia(query)
    const onChange = () => mounted && setState(!!mql.matches)

    mql.addListener(onChange)
    setState(mql.matches)

    return () => {
      mounted = false
      mql.removeListener(onChange)
    }
  }, [query])

  return state
}

