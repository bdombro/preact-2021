import { lazy, Suspense } from 'react'
import { navigate } from '../components/routing'
import AuthStack from './auth'
import BlogStack from './blog'

const AboutRoute = lazy(() => import('./About'))
const NotFound = lazy(() => import('./NotFound'))

export default function StacksIndex() {
    const {pathname} = location

    if (pathname === '/') navigate('/blog')

    return <>
        <AuthStack />
        <BlogStack />
        <Suspense fallback={<></>}>{
            pathname === '/about' && <AboutRoute />
            || !isStackRoute() && <NotFound />    
        }</Suspense>
    </>

    function isStackRoute() {
        const stackRoutes = [AuthStack.basePack, BlogStack.basePath]
        return stackRoutes.some(r => pathname.startsWith(r))
    }
}