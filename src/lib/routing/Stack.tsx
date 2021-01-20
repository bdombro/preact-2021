import { useEffect, useLayoutEffect } from "preact/hooks"
import { navigate, useLocation, UseLocationLocation } from "./index"

type StackHistoryEntry = {location: UseLocationLocation, scroll: number}
type StackHistory = StackHistoryEntry[]
const StackHistories: Record<string, StackHistory> = {}
export default function StackFactory(basePath: string) {
    return function StackHandler({children}: any) {
        const location = useLocation()
        useLayoutEffect(hideBodyUntilScrollRestored, [location])
        useEffect(installListeners, [basePath, location])

        return children

        function hideBodyUntilScrollRestored() {
            setVisibility('hidden')
        }
        function installListeners() {
            let watchScrollInterval: NodeJS.Timeout | null = null
            const {pathname, search} = location
            const baseHistory = { location: { pathname: basePath + '/home', search: '' }, scroll: 0 }
            class Stack {
                static reset = () => { StackHistories[basePath] = [baseHistory]; return StackHistories[basePath][0]}
                static len = () => StackHistories[basePath]?.length ?? 0
                static top = () => StackHistories[basePath]?.[Stack.len() - 1] || Stack.reset()
                static pop = () => StackHistories[basePath].pop() || Stack.reset()
                static push = (entry: StackHistoryEntry) => StackHistories[basePath].push(entry)
            }
            const top = Stack.top()
            const arg = new URLSearchParams(search).get('stack')
            if (arg === 'reset') {
                Stack.reset()
                navigate(basePath, {replace: true})
            }
            else if (arg === 'back') {
                Stack.pop()
                const back = Stack.top()
                navigate(back.location.pathname + back.location.search, {replace: true})
            }
            else if (pathname === top.location.pathname && search === top.location.search) {
                // console.log("top")
                scrollTo(top.scroll)
                setVisibility('visible')
                watchScrollInterval = setInterval(updateScrollPos, 300)
            }
            else if (pathname === basePath) {// recall from stack
                navigate(top.location.pathname + top.location.search, {replace: true})
            }
            else { // forward navigation -- add to history 
                // console.log('forward')
                scrollTo(0)
                setVisibility('visible')
                Stack.push({location, scroll: 0})
                watchScrollInterval = setInterval(updateScrollPos, 300)
            }
            
            return () => { watchScrollInterval && clearInterval(watchScrollInterval) }
        }

        function updateScrollPos() {
            const e = document.getElementById('content')
            if (e) StackHistories[basePath][StackHistories[basePath].length - 1].scroll = e.scrollTop
        }
        function scrollTo(to: number) {
            const e = document.getElementById('content')
            if (e) e.scrollTop = to
        }
        function setVisibility(to: 'visible' | 'hidden') {
            const e = document.getElementById('content')
            if (e) e.style.visibility = to
        }
    }
}