import { lazy, Suspense } from 'react'
import { navigate, useLocation } from '../components/routing'
import AuthStack from './auth'
import BlogStack from './blog'

const AboutRoute = lazy(() => import('./About'))
const NotFound = lazy(() => import('./NotFound'))

export default function StacksIndex() {
    const {pathname} = useLocation()

    if (pathname === '/') navigate('/blog')

    return <div>
        <AuthStack />
        <BlogStack />
        <Suspense fallback={<div/>}>{
            pathname === '/about' && <AboutRoute />
            || !isStackRoute() && <NotFound />    
        }</Suspense>
    </div>

    function isStackRoute() {
        const stackRoutes = [AuthStack.basePack, BlogStack.basePath]
        return stackRoutes.some(r => pathname.startsWith(r))
    }
}