import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks'
import FillerHomeFactory from '~/components/FillerHomeFactory';
import FillerEntryFactory from '~/components/FillerListFactory';
import FillerListFactory from '~/components/FillerListFactory';
import FillerPageFactory from '~/components/FillerPageFactory';
import lazy from "~/lib/lazy"
import { navListen, nav, Route, Stack, useLocation } from '~/lib/routing'

const NotFound = lazy(() => import('~/components/NotFound'))
const LoginLayout = lazy(() => import('~/components/LoginLayout'))
const AdminLayout = lazy(() => import('~/components/AdminLayout'))
const TenantLayout = lazy(() => import('~/components/TenantLayout'))
const BlankLayout = lazy(() => import('~/components/BlankLayout'))
const MarketingLayout = lazy(() => import('~/components/MarketingLayout'))

export const Routes = Object.freeze({


    // Marketing Routes: home, login, support, about, blog

    Home: {
        path: '/',
        component: FillerPageFactory('Home'),
        layout: MarketingLayout,
        stack: Route,
    },
    Login: {
        path: '/login',
        component: lazy(() => import('./auth/login')),
        layout: LoginLayout,
        stack: Route,
    },
    Register: {
        path: '/register',
        component: lazy(() => import('./auth/register')),
        layout: LoginLayout,
        stack: PassThrough,
    },
    ForgotPassword: {
        path: '/forgotPassword',
        component: lazy(() => import('./auth/forgotPassword')),
        layout: LoginLayout,
        stack: PassThrough,
    },
    Logout: {
        path: '/logout',
        component: lazy(() => import('./auth/logout')),
        layout: BlankLayout,
        stack: PassThrough,
    },
    Support: {
        path: '/support',
        component: FillerPageFactory('Support'),
        layout: MarketingLayout,
        stack: Route,
    },
    About: {
        path: '/about',
        component: FillerPageFactory('About'),
        layout: MarketingLayout,
        stack: Route,
    },
    Blog: {
        path: '/blog',
        component: FillerPageFactory('Blog'),
        layout: MarketingLayout,
        stack: Route,
    },


    // Admin Routes: stats, settings, users, posts

    AdminSettingsHome: {
        path: '/admin/settings',
        component: FillerPageFactory('Settings'),
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
        component: FillerPageFactory('Admin Stats'),
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
        component: FillerHomeFactory('Admin Users'),
        layout: AdminLayout,
        stack: Stack('/admin/users'),
    },
    AdminUserList: {
        path: '/admin/users/list',
        component: FillerListFactory('Admin User List'),
        layout: AdminLayout,
        stack: Stack('/admin/users'),
    },
    AdminUserEntry: {
        path: '/admin/users/entry',
        component: FillerHomeFactory('Admin User'),
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
        component: FillerHomeFactory('Admin Blog'),
        layout: AdminLayout,
        stack: Stack('/admin/blog'),
    },
    AdminBlogPostList: {
        path: '/admin/blog/list',
        component: FillerListFactory('Admin Post List'),
        layout: AdminLayout,
        stack: Stack('/admin/blog'),
    },
    AdminBlogPostEntry: {
        path: '/admin/blog/entry',
        component: FillerEntryFactory('Admin Post'),
        layout: AdminLayout,
        stack: Stack('/admin/blog'),
    },




    // Tenant/Customer Routes: stats, settings, users, properties, tasks

    TenantSettingsHome: {
        path: '/tenant/settings',
        component: FillerPageFactory('Tenant Settings'),
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
        component: FillerHomeFactory('Tenant Stats'),
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
        component: FillerHomeFactory('Tenant Users Home'),
        layout: TenantLayout,
        stack: Stack('/tenant/users'),
    },
    TenantUserList: {
        path: '/tenant/users/list',
        component: FillerListFactory('Tenant User List'),
        layout: TenantLayout,
        stack: Stack('/tenant/users'),
    },
    TenantUserEntry: {
        path: '/tenant/users/entry',
        component: FillerEntryFactory('Tenant User'),
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
        component: FillerHomeFactory('Tenant Properties'),
        layout: TenantLayout,
        stack: Stack('/tenant/properties'),
    },
    TenantPropertiesList: {
        path: '/tenant/properties/list',
        component: FillerListFactory('Tenant Property List'),
        layout: TenantLayout,
        stack: Stack('/tenant/properties'),
    },
    TenantPropertiesEntry: {
        path: '/tenant/properties/entry',
        component: FillerEntryFactory('Tenant Property'),
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
        component: FillerHomeFactory('Tenant Tasks'),
        layout: TenantLayout,
        stack: Stack('/tenant/tasks'),
    },
    TenantTasksList: {
        path: '/tenant/tasks/list',
        component: FillerListFactory('Tenant Task List'),
        layout: TenantLayout,
        stack: Stack('/tenant/tasks'),
    },
    TenantTasksEntry: {
        path: '/tenant/tasks/entry',
        component: FillerEntryFactory('Tenant Task'),
        layout: TenantLayout,
        stack: Stack('/tenant/tasks'),
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
    if (pathname === '/admin') nav('/admin/stats')
    if (pathname === '/tenant') nav('/tenant/stats')
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
        const cancel = navListen(onLocationChange)
        onLocationChange()
        return cancel
    }
    function onLocationChange() {
        const match = RoutesByPath[location.pathname]
        if (!match) setLayout(() => BlankLayout)
        else if (Layout !== match.layout) setLayout(() => match.layout)
    }
}