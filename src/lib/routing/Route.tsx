import { useEffect, useLayoutEffect } from "preact/hooks"
import { scrollListen } from "./events"

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
        if (e) return scrollListen(e, updateScrollPos)
    }

    function updateScrollPos(scrollTop: number) {
        RouteHistory[pathname + search] = scrollTop
    }
    function recall() {
        const e = document.getElementById('content')
        if (e 
            && RouteHistory[pathname + search] 
            && Date.now() - history.state > 3000
            ) e.scrollTop = RouteHistory[pathname + location.search]
        setVisibility('visible')
    }
    function setVisibility(to: 'visible' | 'hidden') {
        const e = document.getElementById('content')
        if (e) e.style.visibility = to
    }
}