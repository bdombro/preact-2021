import { useLayoutEffect } from "react"
import useLocation, { UseLocationResponse } from "./useLocation"

type StackHistoryEntry = [location: string, scroll: number]
type StackHistory = StackHistoryEntry[]
const StackHistories: Record<string, StackHistory> = {}
export default function useStackHandler(basePath: string): UseLocationResponse {
    const [location, navigate] = useLocation()
    useLayoutEffect(install, [basePath, location, navigate])
    return [location, navigate]

    function install() {
        let watchScrollInterval: NodeJS.Timeout | null = null

        if (location.startsWith(basePath)) {
            class Stack {
                static reset = () => StackHistories[basePath] = [[basePath, 0]]
                static get = () => StackHistories[basePath]
                static len = () => StackHistories[basePath]?.length ?? 0
                static top = () => StackHistories[basePath][Stack.len() - 1]
                static pop = () => {
                    const res = StackHistories[basePath].pop()
                    if (Stack.len() === 0) Stack.reset()
                    return res
                }
                static push = (entry: StackHistoryEntry) => StackHistories[basePath].push(entry)
            }

            if (!Stack.len()) Stack.reset()

            const topOfStack = Stack.top()
            const arg = new URLSearchParams(window.location.search).get('stack')
            // const uri = location + window.location.search
            if (location === topOfStack[0]) { // cool, were in the right spot
                console.log("top")
                window.scrollTo(0, topOfStack[1])
                watchScroll()
            }
            else if (location === basePath && arg === 'reset') { // reset the stack
                Stack.reset()
                navigate(basePath, { replace: true })
            }
            else if (location === basePath && arg === 'back') { // pop the stack
                Stack.pop()
                navigate(Stack.top()[0], { replace: true })
            }
            else if (location === basePath) // recall from stack
                navigate(topOfStack[0], { replace: true })
            else { // add to history 
                console.log('forward')
                window.scrollTo(0, 0)
                Stack.push([location, 0])
                watchScroll()
            }
        }
        return () => { watchScrollInterval && clearInterval(watchScrollInterval) }

        function watchScroll() {
            watchScrollInterval = setInterval(function updateScrollPos() {
                StackHistories[basePath][StackHistories[basePath].length - 1][1] = window.scrollY
            }, 300)
        }
    }
}