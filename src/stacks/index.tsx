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

    return <>
        <h1><a href='/'>Stack Router Demo</a></h1>
        <Nav />
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