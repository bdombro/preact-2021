import { lazy, Suspense, useEffect } from 'react'
import useLocation from '../hooks/useLocation'
import AuthStack from './auth'
import BlogStack from './blog'
import Nav from '../components/Nav'

const AboutRoute = lazy(() => import('./About'))
const NotFound = lazy(() => import('./NotFound'))

export default function StacksIndex() {
    const [location, navigate] = useLocation()
    useEffect(attachLinkHandler, [location, navigate])

    if (location === '/') navigate('/blog')

    return <>
        <h1><a href='/'>Stack Router Demo</a></h1>
        <Nav />
        <AuthStack />
        <BlogStack />
        <Suspense fallback={<></>}>{
            location === '/about' && <AboutRoute />
            || !isStackRoute() && <NotFound />    
        }</Suspense>
    </>

    function attachLinkHandler() {
        document.body.addEventListener('click', linkHandler);
        return () => { document.body.removeEventListener('click', linkHandler) }
        function linkHandler(event: any) {
            const linkNode = findLinkTagInParents(event.target)
            if (linkNode && linkNode.host === window.location.host) {
                event.preventDefault()
                navigate(linkNode.pathname + `${linkNode.search}`)
            }
        }
        function findLinkTagInParents(node: HTMLElement): any {
            if (node?.nodeName === 'A') return node
            if (node?.parentNode) return findLinkTagInParents(node.parentElement!)
        }
    }
    function isStackRoute() {
        const stackRoutes = [AuthStack.basePack, BlogStack.basePath]
        return stackRoutes.some(r => location.startsWith(r))
    }
}