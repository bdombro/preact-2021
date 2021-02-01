import FillerEntryFactory from '~/layout/FillerEntryFactory'
import FillerHomeFactory from '~/layout/FillerHomeFactory'
import FillerListFactory from '~/layout/FillerListFactory'
import FillerPageFactory from '~/layout/FillerPageFactory'
import lazy from '~/layout/lazy'
import { PassThrough, Redirect, StackFactory } from '~/layout/router'

const LoginLayout = lazy(() => import('~/layout/LoginLayout/LoginLayout'))
const AdminLayout = lazy(() => import('~/layout/AdminLayout/AdminLayout'))
const TenantLayout = lazy(() => import('~/layout/TenantLayout/TenantLayout'))
const MarketingLayout = lazy(() => import('~/layout/MarketingLayout/MarketingLayout'))


export const routes = Object.freeze({

  // Marketing Routes: home, login, support, about, blog

  Home: {
    path: '/',
    Component: FillerPageFactory('Home'),
    Layout: MarketingLayout,
  },
  Login: {
    path: '/login',
    Component: lazy(() => import('./auth/login/Login')),
    Layout: LoginLayout,
  },
  Register: {
    path: '/register',
    Component: lazy(() => import('./auth/register/Register')),
    Layout: LoginLayout,
  },
  ForgotPassword: {
    path: '/forgotPassword',
    Component: lazy(() => import('./auth/forgotPassword/ForgotPassword')),
    Layout: LoginLayout,
  },
  Logout: {
    path: '/logout',
    Component: lazy(() => import('./auth/logout/Logout')),
  },
  Support: {
    path: '/support',
    Component: FillerPageFactory('Support'),
    Layout: MarketingLayout,
  },
  About: {
    path: '/about',
    Component: FillerPageFactory('About'),
    Layout: MarketingLayout,
  },
  Blog: {
    path: '/blog',
    Component: FillerPageFactory('Blog'),
    Layout: MarketingLayout,
  },


  // Admin Routes: stats, settings, users, posts

  AdminRoot: {
    path: '/admin',
    Component: Redirect('/admin/stats'),
  },

  AdminSettingsHome: {
    path: '/admin/settings',
    Component: FillerPageFactory('Settings'),
    Layout: AdminLayout,
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

  TenantRoot: {
    path: '/tenant',
    Component: Redirect('/tenant/stats'),
  },

  TenantSettingsHome: {
    path: '/tenant/settings',
    Component: FillerPageFactory('Tenant Settings'),
    Layout: TenantLayout,
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


export const routesByPath = Object.fromEntries(Object.values(routes).map(r => [r.path, r]))
// @ts-ignore: Maybe fix later
export const Paths: Record<keyof typeof routes, string> = Object.fromEntries(Object.entries(routes).map(([name, r]) => [name, r.path]))

