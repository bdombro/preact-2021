import { useLayoutEffect } from "react"
import { navigate, useLocation, UseLocationLocation } from "./"

type StackHistoryEntry = {location: UseLocationLocation, scroll: number}
type StackHistory = StackHistoryEntry[]
const StackHistories: Record<string, StackHistory> = {}
export default function useStackHandler(basePath: string, defaultChildPath: string): UseLocationLocation {
    const location = useLocation()
    useLayoutEffect(installListeners, [basePath, defaultChildPath, location])
    return location

    function installListeners() {
        let watchScrollInterval: NodeJS.Timeout | null = null
        const {pathname, search} = location

        if (pathname.startsWith(basePath)) {
            const baseHistory = { location: { pathname: basePath + defaultChildPath, search: '' }, scroll: 0 }
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
                history.replaceState(null, '', basePath)
            }
            else if (arg === 'back') {
                Stack.pop()
                const back = Stack.top()
                navigate(back.location.pathname + back.location.search, {replace: true})
            }
            else if (pathname === top.location.pathname && search === top.location.search) {
                console.log("top")
                window.scrollTo(0, top.scroll)
                watchScrollInterval = setInterval(updateScrollPos, 300)
            }
            else if (pathname === basePath) {// recall from stack
                navigate(top.location.pathname + top.location.search, {replace: true})
            }
            else { // forward navigation -- add to history 
                console.log('forward')
                window.scrollTo(0, 0)
                Stack.push({location, scroll: 0})
                watchScrollInterval = setInterval(updateScrollPos, 300)
            }
        }
        return () => { watchScrollInterval && clearInterval(watchScrollInterval) }

        function updateScrollPos() {
            StackHistories[basePath][StackHistories[basePath].length - 1].scroll = window.scrollY
        }
    }
}