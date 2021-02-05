import FillerEntryFactory from '~/layout/FillerEntryFactory'
import FillerHomeFactory from '~/layout/FillerHomeFactory'
import FillerListFactory from '~/layout/FillerListFactory'
import FillerPageFactory from '~/layout/FillerPageFactory'
import lazy from '~/lib/lazy'
import { PassThrough, Redirect, StackFactory } from '~/lib/router'

import { AuthCtx, AuthCtxType } from './App.context'

const LoginLayout = lazy(() => import('~/layout/layout/LoginLayout'))
const AdminLayout = lazy(() => import('~/layout/layout/AdminLayout'))
const TenantLayout = lazy(() => import('~/layout/layout/TenantLayout'))
const MarketingLayout = lazy(() => import('~/layout/layout/MarketingLayout'))


export const routes = Object.freeze({


	// Access Control Routes

	Login: {
		path: '/login',
		Component: lazy(() => import('./pages/auth/Login')),
		Layout: LoginLayout,
	},
	Register: {
		path: '/register',
		Component: lazy(() => import('./pages/auth/Register')),
		Layout: LoginLayout,
	},
	ForgotPassword: {
		path: '/forgotPassword',
		Component: lazy(() => import('./pages/auth/ForgotPassword')),
		Layout: LoginLayout,
	},
	Logout: {
		path: '/logout',
		Component: lazy(() => import('./pages/auth/Logout')),
	},
	Forbidden: {
		path: '/forbidden',
		Component: lazy(() => import('~/pages/auth/Forbidden')),
	},


	// Marketing Routes: home, support, about, blog

	Home: {
		path: '/',
		Component: FillerPageFactory('Home'),
		Layout: MarketingLayout,
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
		hasAccess: isAdmin,
	},

	AdminSettingsHome: {
		path: '/admin/settings',
		Component: FillerPageFactory('Settings'),
		Layout: AdminLayout,
		hasAccess: isAdmin,
	},
    
	AdminStatsStack: {
		path: '/admin/stats',
		Component: PassThrough,
		Layout: AdminLayout,
		Stack: StackFactory('/admin/stats'),
		hasAccess: isAdmin,
	},
	AdminStatsHome: {
		path: '/admin/stats/home',
		Component: FillerPageFactory('Admin Stats'),
		Layout: AdminLayout,
		Stack: StackFactory('/admin/stats'),
		hasAccess: isAdmin,
	},

	AdminUserStack: {
		path: '/admin/users',
		Component: PassThrough,
		Layout: AdminLayout,
		Stack: StackFactory('/admin/users'),
		hasAccess: isAdmin,
	},
	AdminUserHome: {
		path: '/admin/users/home',
		Component: FillerHomeFactory('Admin Users'),
		Layout: AdminLayout,
		Stack: StackFactory('/admin/users'),
		hasAccess: isAdmin,
	},
	AdminUserList: {
		path: '/admin/users/list',
		Component: FillerListFactory('Admin User List'),
		Layout: AdminLayout,
		Stack: StackFactory('/admin/users'),
		hasAccess: isAdmin,
	},
	AdminUserEntry: {
		path: '/admin/users/entry',
		Component: FillerHomeFactory('Admin User'),
		Layout: AdminLayout,
		Stack: StackFactory('/admin/users'),
		hasAccess: isAdmin,
	},
    
	AdminBlogStack: {
		path: '/admin/blog',
		Component: PassThrough,
		Layout: AdminLayout,
		Stack: StackFactory('/admin/blog'),
		hasAccess: isAdmin,
	},
	AdminBlogHome: {
		path: '/admin/blog/home',
		Component: FillerHomeFactory('Admin Blog'),
		Layout: AdminLayout,
		Stack: StackFactory('/admin/blog'),
		hasAccess: isAdmin,
	},
	AdminBlogPostList: {
		path: '/admin/blog/list',
		Component: FillerListFactory('Admin Post List'),
		Layout: AdminLayout,
		Stack: StackFactory('/admin/blog'),
		hasAccess: isAdmin,
	},
	AdminBlogPostEntry: {
		path: '/admin/blog/entry',
		Component: FillerEntryFactory('Admin Post'),
		Layout: AdminLayout,
		Stack: StackFactory('/admin/blog'),
		hasAccess: isAdmin,
	},




	// Tenant/Customer Routes: stats, settings, users, properties, tasks

	TenantRoot: {
		path: '/tenant',
		Component: Redirect('/tenant/stats'),
		hasAccess: isTenant,
	},

	TenantSettingsHome: {
		path: '/tenant/settings',
		Component: FillerPageFactory('Tenant Settings'),
		Layout: TenantLayout,
		hasAccess: isTenant,
	},

	TenantStatsStack: {
		path: '/tenant/stats',
		Component: PassThrough,
		Layout: TenantLayout,
		Stack: StackFactory('/tenant/stats'),
		hasAccess: isTenant,
	},
	TenantStatsHome: {
		path: '/tenant/stats/home',
		Component: FillerHomeFactory('Tenant Stats'),
		Layout: TenantLayout,
		Stack: StackFactory('/tenant/stats'),
		hasAccess: isTenant,
	},

	TenantUserStack: {
		path: '/tenant/users',
		Component: PassThrough,
		Layout: TenantLayout,
		Stack: StackFactory('/tenant/users'),
		hasAccess: isTenant,
	},
	TenantUserHome: {
		path: '/tenant/users/home',
		Component: FillerHomeFactory('Tenant Users Home'),
		Layout: TenantLayout,
		Stack: StackFactory('/tenant/users'),
		hasAccess: isTenant,
	},
	TenantUserList: {
		path: '/tenant/users/list',
		Component: FillerListFactory('Tenant User List'),
		Layout: TenantLayout,
		Stack: StackFactory('/tenant/users'),
		hasAccess: isTenant,
	},
	TenantUserEntry: {
		path: '/tenant/users/entry',
		Component: FillerEntryFactory('Tenant User'),
		Layout: TenantLayout,
		Stack: StackFactory('/tenant/users'),
		hasAccess: isTenant,
	},

	TenantPropertiesStack: {
		path: '/tenant/properties',
		Component: PassThrough,
		Layout: TenantLayout,
		Stack: StackFactory('/tenant/properties'),
		hasAccess: isTenant,
	},
	TenantPropertiesHome: {
		path: '/tenant/properties/home',
		Component: FillerHomeFactory('Tenant Properties'),
		Layout: TenantLayout,
		Stack: StackFactory('/tenant/properties'),
		hasAccess: isTenant,
	},
	TenantPropertiesList: {
		path: '/tenant/properties/list',
		Component: FillerListFactory('Tenant Property List'),
		Layout: TenantLayout,
		Stack: StackFactory('/tenant/properties'),
		hasAccess: isTenant,
	},
	TenantPropertiesEntry: {
		path: '/tenant/properties/entry',
		Component: FillerEntryFactory('Tenant Property'),
		Layout: TenantLayout,
		Stack: StackFactory('/tenant/properties'),
		hasAccess: isTenant,
	},

	TenantTasksStack: {
		path: '/tenant/tasks',
		Component: PassThrough,
		Layout: TenantLayout,
		Stack: StackFactory('/tenant/tasks'),
		hasAccess: isTenant,
	},
	TenantTasksHome: {
		path: '/tenant/tasks/home',
		Component: FillerHomeFactory('Tenant Tasks'),
		Layout: TenantLayout,
		Stack: StackFactory('/tenant/tasks'),
		hasAccess: isTenant,
	},
	TenantTasksList: {
		path: '/tenant/tasks/list',
		Component: FillerListFactory('Tenant Task List'),
		Layout: TenantLayout,
		Stack: StackFactory('/tenant/tasks'),
		hasAccess: isTenant,
	},
	TenantTasksEntry: {
		path: '/tenant/tasks/entry',
		Component: FillerEntryFactory('Tenant Task'),
		Layout: TenantLayout,
		Stack: StackFactory('/tenant/tasks'),
		hasAccess: isTenant,
	},

	NotFound: {
		path: '/notfound',
		Component: lazy(() => import('~/pages/NotFound')),
	},
})


export const routesByPath = Object.fromEntries(Object.values(routes).map(r => [r.path, r]))
// @ts-ignore: Maybe fix later
export const Paths: Record<keyof typeof routes, string> = Object.fromEntries(Object.entries(routes).map(([name, r]) => [name, r.path]))


function isAdmin(auth: AuthCtxType) { return auth.roles.includes(AuthCtx.roles.admin) }
function isTenant(auth: AuthCtxType) { return auth.roles.includes(AuthCtx.roles.tenant) }