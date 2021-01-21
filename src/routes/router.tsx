import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks'
import lazy from "~/components/lazy"
import { attachHistoryChangeListener, navigate, Route, Stack, useLocation } from '~/lib/routing'

const NotFound = lazy(() => import('~/components/NotFound'))
const AdminLayout = lazy(() => import('~/components/AdminLayout'))
const TenantLayout = lazy(() => import('~/components/TenantLayout'))
const BlankLayout = lazy(() => import('~/components/BlankLayout'))
const MarketingLayout = lazy(() => import('~/components/MarketingLayout'))

export const Routes = Object.freeze({


    // Marketing Routes: home, login, support, about, blog

    Home: {
        path: '/',
        component: lazy(() => import('./marketing/home')),
        layout: MarketingLayout,
        stack: Route,
    },
    Login: {
        path: '/login',
        component: lazy(() => import('./auth/login')),
        layout: BlankLayout,
        stack: Route,
    },
    Register: {
        path: '/register',
        component: lazy(() => import('./auth/register')),
        layout: BlankLayout,
        stack: Route,
    },
    ForgotPassword: {
        path: '/forgotPassword',
        component: lazy(() => import('./auth/forgotPassword')),
        layout: BlankLayout,
        stack: Route,
    },
    Logout: {
        path: '/logout',
        component: lazy(() => import('./auth/logout')),
        layout: BlankLayout,
        stack: Route,
    },
    Support: {
        path: '/support',
        component: lazy(() => import('./marketing/support')),
        layout: MarketingLayout,
        stack: Route,
    },
    About: {
        path: '/about',
        component: lazy(() => import('./marketing/about')),
        layout: MarketingLayout,
        stack: Route,
    },
    Blog: {
        path: '/blog',
        component: lazy(() => import('./marketing/blog')),
        layout: MarketingLayout,
        stack: Route,
    },


    // Admin Routes: stats, settings, users, posts

    AdminSettingsHome: {
        path: '/admin/settings',
        component: lazy(() => import('./admin/settings/home')),
        layout: AdminLayout,
        stack: Route,
    },
    
    AdminStatsStack: {
        path: '/admin/stats',
        component: PassThrough,
        layout: AdminLayout,
        stack: Stack('/admin/stats'),
    },
    AdminStatsHome: {
        path: '/admin/stats/home',
        component: lazy(() => import('./admin/stats/home')),
        layout: AdminLayout,
        stack: Stack('/admin/stats'),
    },

    AdminUserStack: {
        path: '/admin/users',
        component: PassThrough,
        layout: AdminLayout,
        stack: Stack('/admin/users'),
    },
    AdminUserHome: {
        path: '/admin/users/home',
        component: lazy(() => import('./admin/users/home')),
        layout: AdminLayout,
        stack: Stack('/admin/users'),
    },
    AdminUserList: {
        path: '/admin/users/list',
        component: lazy(() => import('./admin/users/list')),
        layout: AdminLayout,
        stack: Stack('/admin/users'),
    },
    AdminUserEntry: {
        path: '/admin/users/entry',
        component: lazy(() => import('./admin/users/entry')),
        layout: AdminLayout,
        stack: Stack('/admin/users'),
    },
    
    AdminBlogStack: {
        path: '/admin/blog',
        component: PassThrough,
        layout: AdminLayout,
        stack: Stack('/admin/blog'),
    },
    AdminBlogHome: {
        path: '/admin/blog/home',
        component: lazy(() => import('./admin/blog/home')),
        layout: AdminLayout,
        stack: Stack('/admin/blog'),
    },
    AdminBlogPostList: {
        path: '/admin/blog/list',
        component: lazy(() => import('./admin/blog/list')),
        layout: AdminLayout,
        stack: Stack('/admin/blog'),
    },
    AdminBlogPostEntry: {
        path: '/admin/blog/entry',
        component: lazy(() => import('./admin/blog/entry')),
        layout: AdminLayout,
        stack: Stack('/admin/blog'),
    },




    // Tenant/Customer Routes: stats, settings, users, properties, tasks

    TenantSettingsHome: {
        path: '/tenant/settings',
        component: lazy(() => import('./tenant/settings/home')),
        layout: TenantLayout,
        stack: Route,
    },

    TenantStatsStack: {
        path: '/tenant/stats',
        component: PassThrough,
        layout: TenantLayout,
        stack: Stack('/tenant/stats'),
    },
    TenantStatsHome: {
        path: '/tenant/stats/home',
        component: lazy(() => import('./tenant/stats/home')),
        layout: TenantLayout,
        stack: Stack('/tenant/stats'),
    },

    TenantUserStack: {
        path: '/tenant/users',
        component: PassThrough,
        layout: TenantLayout,
        stack: Stack('/tenant/users'),
    },
    TenantUserHome: {
        path: '/tenant/users/home',
        component: lazy(() => import('./tenant/users/home')),
        layout: TenantLayout,
        stack: Stack('/tenant/users'),
    },
    TenantUserList: {
        path: '/tenant/users/list',
        component: lazy(() => import('./tenant/users/list')),
        layout: TenantLayout,
        stack: Stack('/tenant/users'),
    },
    TenantUserEntry: {
        path: '/tenant/users/entry',
        component: lazy(() => import('./tenant/users/entry')),
        layout: TenantLayout,
        stack: Stack('/tenant/users'),
    },

    TenantPropertiesStack: {
        path: '/tenant/properties',
        component: PassThrough,
        layout: TenantLayout,
        stack: Stack('/tenant/properties'),
    },
    TenantPropertiesHome: {
        path: '/tenant/properties/home',
        component: lazy(() => import('./tenant/properties/home')),
        layout: TenantLayout,
        stack: Stack('/tenant/properties'),
    },
    TenantPropertiesList: {
        path: '/tenant/properties/list',
        component: lazy(() => import('./tenant/properties/list')),
        layout: TenantLayout,
        stack: Stack('/tenant/properties'),
    },
    TenantPropertiesEntry: {
        path: '/tenant/properties/entry',
        component: lazy(() => import('./tenant/properties/entry')),
        layout: TenantLayout,
        stack: Stack('/tenant/properties'),
    },

    TenantTasksStack: {
        path: '/tenant/tasks',
        component: PassThrough,
        layout: TenantLayout,
        stack: Stack('/tenant/tasks'),
    },
    TenantTasksHome: {
        path: '/tenant/tasks/home',
        component: lazy(() => import('./tenant/tasks/home')),
        layout: TenantLayout,
        stack: Stack('/tenant/tasks'),
    },
    TenantTasksList: {
        path: '/tenant/tasks/list',
        component: lazy(() => import('./tenant/tasks/list')),
        layout: TenantLayout,
        stack: Stack('/tenant/tasks'),
    },
    TenantTasksEntry: {
        path: '/tenant/tasks/entry',
        component: lazy(() => import('./tenant/tasks/entry')),
        layout: TenantLayout,
        stack: Stack('/tenant/tasks'),
    },
})


export const RoutesByPath = Object.fromEntries(Object.values(Routes).map(r => [r.path, r]))
// @ts-ignore: Maybe fix later
export const Paths: Record<keyof typeof Routes, string> = Object.fromEntries(Object.entries(Routes).map(([name, r]) => [name, r.path]))


function StackRoute(stackPath: string, relPath: string, layout: any) {
    return {
        path: stackPath + relPath,
        component: lazy(() => import('.' + stackPath + relPath)),
        layout,
        stack: Stack(stackPath),
    }
}

function PassThrough({children}: any) {
    return children
}

function RouterSwitch() {
    const {pathname} = useLocation()
    if (pathname === '/admin') navigate('/admin/stats')
    if (pathname === '/tenant') navigate('/tenant/stats')
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