import { Fragment, h } from 'preact';
import lazy from '~/components/lazy'
import { navigate, useLocation } from '../components/routing'
import AuthStack from './auth'
import BlogStack from './blog'

const AboutRoute = lazy(() => import('./About'))
const NotFound = lazy(() => import('./NotFound'))

const stackRoutes = [AuthStack.basePack, BlogStack.basePath]

export default function StacksIndex() {
    const { pathname } = useLocation()
    
    if (pathname === '/') navigate('/about')

    return <Fragment>
        <AuthStack />
        <BlogStack />
        {
            pathname === '/about' && <AboutRoute />
            || !isStackRoute() && <NotFound />
        }
    </Fragment>

    function isStackRoute() {
        return stackRoutes.some(r => pathname.startsWith(r))
    }
}
