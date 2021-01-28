import { h } from 'preact';
import { useLayoutEffect, useState } from 'preact/hooks'
import FillerHomeFactory from '~/components/FillerHomeFactory';
import FillerEntryFactory from '~/components/FillerListFactory';
import FillerListFactory from '~/components/FillerListFactory';
import FillerPageFactory from '~/components/FillerPageFactory';
import lazy from "~/lib/lazy"
import { navListener, nav, Route, StackFactory, useLocation } from '~/lib/routing'

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
        Component: FillerPageFactory('Home'),
        Layout: MarketingLayout,
        Stack: Route,
    },
    Login: {
        path: '/login',
        Component: lazy(() => import('./auth/login')),
        Layout: LoginLayout,
        Stack: Route,
    },
    Register: {
        path: '/register',
        Component: lazy(() => import('./auth/register')),
        Layout: LoginLayout,
        Stack: Route,
    },
    ForgotPassword: {
        path: '/forgotPassword',
        Component: lazy(() => import('./auth/forgotPassword')),
        Layout: LoginLayout,
        Stack: Route,
    },
    Logout: {
        path: '/logout',
        Component: lazy(() => import('./auth/logout')),
        Layout: BlankLayout,
        Stack: Route,
    },
    Support: {
        path: '/support',
        Component: FillerPageFactory('Support'),
        Layout: MarketingLayout,
        Stack: Route,
    },
    About: {
        path: '/about',
        Component: FillerPageFactory('About'),
        Layout: MarketingLayout,
        Stack: Route,
    },
    Blog: {
        path: '/blog',
        Component: FillerPageFactory('Blog'),
        Layout: MarketingLayout,
        Stack: Route,
    },


    // Admin Routes: stats, settings, users, posts

    AdminSettingsHome: {
        path: '/admin/settings',
        Component: FillerPageFactory('Settings'),
        Layout: AdminLayout,
        Stack: Route,
    },
    
    AdminStatsStack: {
        path: '/admin/stats',
        Component: PassThrough,
        Layout: AdminLayout,
        Stack: StackFactory('/admin/stats'),
    },
    AdminStatsHome: {
        path: '/admin/stats/home',
        Component: FillerPageFactory('Admin Stats'),
        Layout: AdminLayout,
        Stack: StackFactory('/admin/stats'),
    },

    AdminUserStack: {
        path: '/admin/users',
        Component: PassThrough,
        Layout: AdminLayout,
        Stack: StackFactory('/admin/users'),
    },
    AdminUserHome: {
        path: '/admin/users/home',
        Component: FillerHomeFactory('Admin Users'),
        Layout: AdminLayout,
        Stack: StackFactory('/admin/users'),
    },
    AdminUserList: {
        path: '/admin/users/list',
        Component: FillerListFactory('Admin User List'),
        Layout: AdminLayout,
        Stack: StackFactory('/admin/users'),
    },
    AdminUserEntry: {
        path: '/admin/users/entry',
        Component: FillerHomeFactory('Admin User'),
        Layout: AdminLayout,
        Stack: StackFactory('/admin/users'),
    },
    
    AdminBlogStack: {
        path: '/admin/blog',
        Component: PassThrough,
        Layout: AdminLayout,
        Stack: StackFactory('/admin/blog'),
    },
    AdminBlogHome: {
        path: '/admin/blog/home',
        Component: FillerHomeFactory('Admin Blog'),
        Layout: AdminLayout,
        Stack: StackFactory('/admin/blog'),
    },
    AdminBlogPostList: {
        path: '/admin/blog/list',
        Component: FillerListFactory('Admin Post List'),
        Layout: AdminLayout,
        Stack: StackFactory('/admin/blog'),
    },
    AdminBlogPostEntry: {
        path: '/admin/blog/entry',
        Component: FillerEntryFactory('Admin Post'),
        Layout: AdminLayout,
        Stack: StackFactory('/admin/blog'),
    },




    // Tenant/Customer Routes: stats, settings, users, properties, tasks

    TenantSettingsHome: {
        path: '/tenant/settings',
        Component: FillerPageFactory('Tenant Settings'),
        Layout: TenantLayout,
        Stack: Route,
    },

    TenantStatsStack: {
        path: '/tenant/stats',
        Component: PassThrough,
        Layout: TenantLayout,
        Stack: StackFactory('/tenant/stats'),
    },
    TenantStatsHome: {
        path: '/tenant/stats/home',
        Component: FillerHomeFactory('Tenant Stats'),
        Layout: TenantLayout,
        Stack: StackFactory('/tenant/stats'),
    },

    TenantUserStack: {
        path: '/tenant/users',
        Component: PassThrough,
        Layout: TenantLayout,
        Stack: StackFactory('/tenant/users'),
    },
    TenantUserHome: {
        path: '/tenant/users/home',
        Component: FillerHomeFactory('Tenant Users Home'),
        Layout: TenantLayout,
        Stack: StackFactory('/tenant/users'),
    },
    TenantUserList: {
        path: '/tenant/users/list',
        Component: FillerListFactory('Tenant User List'),
        Layout: TenantLayout,
        Stack: StackFactory('/tenant/users'),
    },
    TenantUserEntry: {
        path: '/tenant/users/entry',
        Component: FillerEntryFactory('Tenant User'),
        Layout: TenantLayout,
        Stack: StackFactory('/tenant/users'),
    },

    TenantPropertiesStack: {
        path: '/tenant/properties',
        Component: PassThrough,
        Layout: TenantLayout,
        Stack: StackFactory('/tenant/properties'),
    },
    TenantPropertiesHome: {
        path: '/tenant/properties/home',
        Component: FillerHomeFactory('Tenant Properties'),
        Layout: TenantLayout,
        Stack: StackFactory('/tenant/properties'),
    },
    TenantPropertiesList: {
        path: '/tenant/properties/list',
        Component: FillerListFactory('Tenant Property List'),
        Layout: TenantLayout,
        Stack: StackFactory('/tenant/properties'),
    },
    TenantPropertiesEntry: {
        path: '/tenant/properties/entry',
        Component: FillerEntryFactory('Tenant Property'),
        Layout: TenantLayout,
        Stack: StackFactory('/tenant/properties'),
    },

    TenantTasksStack: {
        path: '/tenant/tasks',
        Component: PassThrough,
        Layout: TenantLayout,
        Stack: StackFactory('/tenant/tasks'),
    },
    TenantTasksHome: {
        path: '/tenant/tasks/home',
        Component: FillerHomeFactory('Tenant Tasks'),
        Layout: TenantLayout,
        Stack: StackFactory('/tenant/tasks'),
    },
    TenantTasksList: {
        path: '/tenant/tasks/list',
        Component: FillerListFactory('Tenant Task List'),
        Layout: TenantLayout,
        Stack: StackFactory('/tenant/tasks'),
    },
    TenantTasksEntry: {
        path: '/tenant/tasks/entry',
        Component: FillerEntryFactory('Tenant Task'),
        Layout: TenantLayout,
        Stack: StackFactory('/tenant/tasks'),
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

    // Redirects
    if (pathname === '/admin') nav('/admin/stats')
    if (pathname === '/tenant') nav('/tenant/stats')
    
    const {Stack, Component} = RoutesByPath[pathname] || { Component: NotFound, Stack: Route }
    return <Stack><Component/></Stack>
}

/**
 * Wraps the Router Switch in a Layout, and strategically only re-renders
 * the layout if the layout has changed, preserving state in the layouts
 * and improving performance
 */
export default function Router() {
    const [Layout, setLayout] = useState<any>(() => BlankLayout)
    useLayoutEffect(watchLocation, [])
    return <Layout><RouterSwitch /></Layout>

    function watchLocation() {
        onLocationChange()
        return navListener(onLocationChange)
    }
    function onLocationChange() {
        const match = RoutesByPath[location.pathname]
        if (!match) setLayout(() => BlankLayout)
        else if (Layout !== match.Layout) setLayout(() => match.Layout)
    }
}