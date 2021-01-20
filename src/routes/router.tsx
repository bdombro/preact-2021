import { h } from 'preact';
import { useEffect, useLayoutEffect, useState } from 'preact/hooks';
import lazy from "~/components/lazy";
import { attachHistoryChangeListener, navigate, useLocation } from '~/components/routing';
import {Stack} from '~/components/routing';

const NotFound = lazy(() => import('./NotFound'))
const DashboardLayout = lazy(() => import('~/components/DashboardLayout'))
const BlankLayout = lazy(() => import('~/components/BlankLayout'))

export const Routes: {path: string, component: any, layout: any, stack?: any}[] = [
    {
        path: '/about',
        component: lazy(() => import('./About')),
        layout: BlankLayout,
    },
    {
        path: '/auth',
        component: Stack('/auth'),
        layout: DashboardLayout,
    },
    {
        path: '/auth/home',
        component: lazy(() => import('./auth')),
        layout: DashboardLayout,
        stack: Stack('/auth'),
    },
    {
        path: '/auth/user',
        component: lazy(() => import('./auth/User')),
        layout: DashboardLayout,
        stack: Stack('/auth'),
    },
    {
        path: '/auth/users',
        component: lazy(() => import('./auth/UserList')),
        layout: DashboardLayout,
        stack: Stack('/auth'),
    },
    {
        path: '/blog',
        component: Stack('/blog'),
        layout: DashboardLayout,
    },
    {
        path: '/blog/home',
        component: lazy(() => import('./blog')),
        layout: DashboardLayout,
        stack: Stack('/blog'),
    },
    {
        path: '/blog/post',
        component: lazy(() => import('./blog/Post')),
        layout: DashboardLayout,
        stack: Stack('/blog'),
    },
    {
        path: '/blog/posts',
        component: lazy(() => import('./blog/PostList')),
        layout: DashboardLayout,
        stack: Stack('/blog'),
    },

]

function PassThrough({children}: any) {
    return children
}

function RouterSwitch() {
    const {pathname} = useLocation()
    if (pathname === '/') navigate('/about')
    const match = Routes.find(r => r.path === pathname)
    const Stack = match?.stack || PassThrough
    return match ? <Stack><match.component/></Stack> : <NotFound />
}

/**
 * Wraps the Router Switch in a Layout, and strategically only re-renders
 * the layout if the layout has changed, preserving state in the layouts
 * and improving performance
 */
export default function Router() {
    const [Layout, setLayout] = useState<any>(() => PassThrough)
    useEffect(watchLocation, [])
    return <Layout><RouterSwitch /></Layout>

    function watchLocation() {
        const cancel = attachHistoryChangeListener(onLocationChange)
        onLocationChange()
        return cancel
    }
    function onLocationChange() {
        const match = Routes.find(r => r.path === location.pathname)
        if (!match) setLayout(() => BlankLayout)
        else if (Layout !== match.layout) setLayout(() => match.layout)
    }
}