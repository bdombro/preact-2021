import { useEffect, useLayoutEffect } from "preact/hooks"
import { navigate, useLocation, UseLocationLocation } from "./index"

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
        const watchScrollInterval = setInterval(updateScrollPos, 300)
        return () => { 
            clearInterval(watchScrollInterval)
        }
    }

    function updateScrollPos() {
        const e = document.getElementById('content')
        if (e) RouteHistory[pathname + search] = e.scrollTop
    }
    function forward() {
        setVisibility('visible')
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