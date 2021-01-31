import { useEffect, useLayoutEffect } from 'preact/hooks'

import scrollListener from './scrollListener'

const RouteHistory: Record<string, number> = {}
export default function Route({ children }: any) {
  const {pathname, search} = location
  useLayoutEffect(hideBodyUntilScrollRestored, [location])
  useEffect(installListeners, [])
  useEffect(recall, [location])

  return children

  function hideBodyUntilScrollRestored() {
    setVisibility('hidden')
  }
  function installListeners() {
    const e = document.getElementById('content')!
    if (e) return scrollListener(e, updateScrollPos)
  }

  function updateScrollPos(scrollTop: number) {
    RouteHistory[pathname + search] = scrollTop
  }
  function recall() {
    const e = document.getElementById('content')
    if (e) {
      if (RouteHistory[pathname + search] && Date.now() - history.state > 3000) 
        e.scrollTop = RouteHistory[pathname + location.search]
      else {
        updateScrollPos(0)
        e.scrollTop = 0
      }
    }
    setVisibility('visible')
  }
  function setVisibility(to: 'visible' | 'hidden') {
    const e = document.getElementById('content')
    if (e) e.style.visibility = to
  }
}