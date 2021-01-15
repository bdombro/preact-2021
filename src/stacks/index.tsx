import { lazy, Suspense, useEffect } from 'react'
import useLocation from '../hooks/useLocation'
import AuthStack from './auth'
import BlogStack from './blog'

const AboutRoute = lazy(() => import('./About'))
const NotFound = lazy(() => import('./NotFound'))

export default function StacksIndex() {
    const [location, navigate] = useLocation()
    useEffect(attachLinkHandler, [location, navigate])

    return <>
        <h1>Stack Router Demo</h1>
        <ul>
            <li><a href={'/auth'}>Auth</a></li>
            <li><a href={'/blog' + (location.startsWith('/blog') ? '?stack=reset': '')}>Blog</a></li>
            <li><a href={'/blog/' + Math.random()} >Random Post</a></li>
            <li><a href={'/blog?stack=back'}>Go Back</a></li>
        </ul>
        <AuthStack />
        <BlogStack />
        <Suspense fallback={<></>}>
            {location === '/about' && <AboutRoute />}
            {!['auth', 'blog', 'about'].includes(location.split('/')?.[1]) && <NotFound/>}
        </Suspense>
    </>

    function attachLinkHandler() {
        if (location === '/') navigate('/blog')
        document.body.addEventListener('click', linkHandler);
        return () => { document.body.removeEventListener('click', linkHandler) }
        function linkHandler(event: any) {
            if (event.target.nodeName === 'A' && event.target.host === window.location.host) {
                event.preventDefault()
                navigate(event.target.pathname + `${event.target.search}`)
            }
        }
    }
}