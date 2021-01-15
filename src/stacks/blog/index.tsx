import { useLayoutEffect } from 'react'
import useLocation from '../../useLocation'
import IndexRoute from './routes/IndexRoute'
import PostRoute from './routes/PostRoute'

const basePath = '/blog'
let stackHistory: [location: string, scroll: number][] = []
export default function StacksIndex() {
    const [location, navigate] = useLocation()

    let stack = location.split('/')?.[2] ?? '/'
    if (!['/'].includes(stack)) stack = 'default'

    useLayoutEffect(() => {
        let interval: NodeJS.Timeout | null = null
        if (location.startsWith(basePath)) {
            if (!stackHistory.length) stackHistory = [[basePath, 0]]
            const topOfStack = stackHistory[stackHistory.length - 1]
            const arg = new URLSearchParams(window.location.search).get('stack')
            if (location === topOfStack[0]) { // cool, were in the right spot
                console.log("top")
                window.scrollTo(0, topOfStack[1])
                watchScroll()
            }
            else if (location === basePath && arg === 'reset') { // reset the stack
                stackHistory = []
                navigate(basePath, { replace: true })
            }
            else if (location === basePath && arg === 'back') { // pop the stack
                stackHistory.pop()
                const back = stackHistory?.[stackHistory.length - 1] ?? [basePath, 0]
                navigate(back[0], { replace: true })
            }
            else if (location === basePath) // recall from stack
                navigate(topOfStack[0], { replace: true })
            else { // add to history 
                console.log('forward')
                window.scrollTo(0, 0)
                stackHistory.push([location,0])
                watchScroll()
            }
        }
        return () => {interval && clearInterval(interval)}

        function watchScroll() {
            interval = setInterval(() => {
                stackHistory[stackHistory.length - 1] = [stackHistory[stackHistory.length - 1][0], window.scrollY]
            }, 300)
        }
    }, [location, navigate])

    return <div>
        <div style={{ display: stack === '/' ? 'block' : 'none' }}><IndexRoute /></div>
        <div style={{ display: stack === 'default' ? 'block' : 'none' }}><PostRoute /></div>
    </div>
}