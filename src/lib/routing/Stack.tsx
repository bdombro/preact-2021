import { useEffect, useLayoutEffect } from "preact/hooks"
import { nav, scrollListen, useLocation, UseLocationLocation } from "./index"

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
            let cancelScrollListen: any = () => null
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
                nav(basePath, {replace: true})
            }
            else if (arg === 'back') {
                Stack.pop()
                const back = Stack.top()
                nav(back.location.pathname + back.location.search, {replace: true})
            }
            else if (pathname === top.location.pathname && search === top.location.search) {
                // console.log("top")
                scrollTo(top.scroll)
                setVisibility('visible')
                const e = document.getElementById('content')!
                if (e) cancelScrollListen = scrollListen(e, updateScrollPos)
            }
            else if (pathname === basePath) {// recall from stack
                nav(top.location.pathname + top.location.search, {replace: true})
            }
            else { // forward navigation -- add to history 
                // console.log('forward')
                scrollTo(0)
                setVisibility('visible')
                Stack.push({location, scroll: 0})
                const e = document.getElementById('content')!
                if (e) cancelScrollListen = scrollListen(e, updateScrollPos)
            }
            
            return cancelScrollListen
        }

        function updateScrollPos(scrollTop: number) {
            StackHistories[basePath][StackHistories[basePath].length - 1].scroll = scrollTop
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