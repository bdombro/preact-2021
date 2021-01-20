import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import lazy from "~/components/lazy";
import { attachHistoryChangeListener, navigate, Route, Stack, useLocation } from '~/lib/routing';

const NotFound = lazy(() => import('../components/NotFound'))
const DashboardLayout = lazy(() => import('~/components/DashboardLayout'))
const BlankLayout = lazy(() => import('~/components/BlankLayout'))

export const Routes = Object.freeze({
    About: {
        path: '/about',
        component: lazy(() => import('./about')),
        layout: BlankLayout,
        stack: Route,
    },
    AuthStack: {
        path: '/auth',
        component: PassThrough,
        layout: DashboardLayout,
        stack: Stack('/auth'),
    },
    AuthHome: {
        path: '/auth/home',
        component: lazy(() => import('./auth')),
        layout: DashboardLayout,
        stack: Stack('/auth'),
    },
    AuthUser: {
        path: '/auth/user',
        component: lazy(() => import('./auth/User')),
        layout: DashboardLayout,
        stack: Stack('/auth'),
    },
    AuthUsers: {
        path: '/auth/users',
        component: lazy(() => import('./auth/UserList')),
        layout: DashboardLayout,
        stack: Stack('/auth'),
    },
    BlogStack: {
        path: '/blog',
        component: PassThrough,
        layout: DashboardLayout,
        stack: Stack('/blog'),
    },
    BlogHome: {
        path: '/blog/home',
        component: lazy(() => import('./blog')),
        layout: DashboardLayout,
        stack: Stack('/blog'),
    },
    BlogPost: {
        path: '/blog/post',
        component: lazy(() => import('./blog/Post')),
        layout: DashboardLayout,
        stack: Stack('/blog'),
    },
    BlogPosts: {
        path: '/blog/posts',
        component: lazy(() => import('./blog/PostList')),
        layout: DashboardLayout,
        stack: Stack('/blog'),
    },

})
export const RoutesByPath = Object.fromEntries(Object.values(Routes).map(r => [r.path, r]))
// @ts-ignore: Maybe fix later
export const Paths: Record<keyof typeof Routes, string> = Object.fromEntries(Object.entries(Routes).map(([name, r]) => [name, r.path]))

function PassThrough({children}: any) {
    return children
}

function RouterSwitch() {
    const {pathname} = useLocation()
    if (pathname === '/') navigate('/about')
    const match = RoutesByPath[pathname]
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
        const match = RoutesByPath[location.pathname]
        if (!match) setLayout(() => BlankLayout)
        else if (Layout !== match.layout) setLayout(() => match.layout)
    }
}