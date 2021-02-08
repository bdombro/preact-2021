import FillerEntryFactory from '~/layout/FillerEntryFactory'
import FillerHomeFactory from '~/layout/FillerHomeFactory'
import FillerListFactory from '~/layout/FillerListFactory'
import FillerPageFactory from '~/layout/FillerPageFactory'
import * as i from '~/lib/icons'
import lazy from '~/lib/lazy'
import { PassThrough, Redirect, RouteFactory } from '~/lib/router'

import { AuthCtx } from './App.context'

const LoginLayout = lazy(() => import('~/layout/layout/LoginLayout'))
const AdminLayout = lazy(() => import('~/layout/layout/AdminLayout'))
const TenantLayout = lazy(() => import('~/layout/layout/TenantLayout'))
const MarketingLayout = lazy(() => import('~/layout/layout/MarketingLayout'))

export const routes = Object.freeze({


	// Access Control Routes

	Login: RouteFactory({
		title: 'Login',
		Icon: i.Login,
		path: '/login',
		Component: lazy(() => import('./pages/auth/Login')),
		Layout: LoginLayout,
	}),
	Register: RouteFactory({
		title: 'Register',
		Icon: i.Login,
		path: '/register',
		Component: lazy(() => import('./pages/auth/Register')),
		Layout: LoginLayout,
	}),
	ForgotPassword: RouteFactory({
		title: 'Forgot Password',
		Icon: i.Auth,
		path: '/forgotPassword',
		Component: lazy(() => import('./pages/auth/ForgotPassword')),
		Layout: LoginLayout,
	}),
	Logout: RouteFactory({
		title: 'Logout',
		Icon: i.Logout,
		path: '/logout',
		Component: lazy(() => import('./pages/auth/Logout')),
	}),
	Forbidden: RouteFactory({
		title: 'Forbidden',
		path: '/forbidden',
		Component: lazy(() => import('~/pages/auth/Forbidden')),
	}),


	// Marketing Routes: home, support, about, blog

	Home: RouteFactory({
		title: 'Home',
		Icon: i.Home,
		path: '/',
		Component: FillerPageFactory('Home'),
		Layout: MarketingLayout,
	}),
	Support: RouteFactory({
		title: 'Support',
		Icon: i.Info,
		path: '/support',
		Component: FillerPageFactory('Support'),
		Layout: MarketingLayout,
	}),
	About: RouteFactory({
		title: 'About',
		Icon: i.Info,
		path: '/about',
		Component: FillerPageFactory('About'),
		Layout: MarketingLayout,
	}),
	Blog: RouteFactory({
		title: 'Blog',
		Icon: i.Post,
		path: '/blog',
		Component: FillerPageFactory('Blog'),
		Layout: MarketingLayout,
	}),


	// Admin Routes: stats, settings, users, posts

	AdminRoot: RouteFactory({
		title: 'Dashboard',
		Icon: i.Counter,
		path: '/admin',
		Component: Redirect('/admin/stats'),
		hasAccess: isAdmin,
	}),

	AdminSettingsHome: RouteFactory({
		title: 'Settings',
		Icon: i.Account,
		path: '/admin/settings',
		Component: FillerPageFactory('Settings'),
		Layout: AdminLayout,
		hasAccess: isAdmin,
	}),
    
	AdminStatsStack: RouteFactory({
		title: 'Stats',
		Icon: i.Counter,
		path: '/admin/stats',
		Component: PassThrough,
		Layout: AdminLayout,
		stack: '/admin/stats',
		hasAccess: isAdmin,
	}),
	AdminStatsHome: RouteFactory({
		title: 'Stats',
		Icon: i.Counter,
		path: '/admin/stats/home',
		Component: FillerPageFactory('Admin Stats'),
		Layout: AdminLayout,
		stack: '/admin/stats',
		hasAccess: isAdmin,
	}),

	AdminUserStack: RouteFactory({
		title: 'Users',
		Icon: i.Auth,
		path: '/admin/users',
		Component: PassThrough,
		Layout: AdminLayout,
		stack: '/admin/users',
		hasAccess: isAdmin,
	}),
	AdminUserHome: RouteFactory({
		title: 'Users',
		Icon: i.Auth,
		path: '/admin/users/home',
		Component: FillerHomeFactory('Admin Users'),
		Layout: AdminLayout,
		stack: '/admin/users',
		hasAccess: isAdmin,
	}),
	AdminUserList: RouteFactory({
		title: 'User List',
		Icon: i.Auth,
		path: '/admin/users/list',
		Component: FillerListFactory('Admin User List'),
		Layout: AdminLayout,
		stack: '/admin/users',
		hasAccess: isAdmin,
	}),
	AdminUserEntry: RouteFactory({
		title: '',
		Icon: i.Auth,
		path: '/admin/users/entry',
		Component: FillerEntryFactory('Admin User'),
		Layout: AdminLayout,
		stack: '/admin/users',
		hasAccess: isAdmin,
	}),
    
	AdminBlogStack: RouteFactory({
		title: 'Blog',
		Icon: i.Post,
		path: '/admin/blog',
		Component: PassThrough,
		Layout: AdminLayout,
		stack: '/admin/blog',
		hasAccess: isAdmin,
	}),
	AdminBlogHome: RouteFactory({
		title: 'Blog',
		Icon: i.Post,
		path: '/admin/blog/home',
		Component: FillerHomeFactory('Admin Blog'),
		Layout: AdminLayout,
		stack: '/admin/blog',
		hasAccess: isAdmin,
	}),
	AdminBlogPostList: RouteFactory({
		title: 'Posts',
		Icon: i.Post,
		path: '/admin/blog/list',
		Component: FillerListFactory('Admin Post List'),
		Layout: AdminLayout,
		stack: '/admin/blog',
		hasAccess: isAdmin,
	}),
	AdminBlogPostEntry: RouteFactory({
		title: '',
		Icon: i.Post,
		path: '/admin/blog/entry',
		Component: FillerEntryFactory('Admin Post'),
		Layout: AdminLayout,
		stack: '/admin/blog',
		hasAccess: isAdmin,
	}),




	// Tenant/Customer Routes: stats, settings, users, properties, tasks

	TenantRoot: RouteFactory({
		title: 'Dashboard',
		Icon: i.Counter,
		path: '/tenant',
		Component: Redirect('/tenant/stats'),
		hasAccess: isTenant,
	}),

	TenantSettingsHome: RouteFactory({
		title: 'Settings',
		Icon: i.Account,
		path: '/tenant/settings',
		Component: FillerPageFactory('Tenant Settings'),
		Layout: TenantLayout,
		hasAccess: isTenant,
	}),

	TenantStatsStack: RouteFactory({
		title: 'Stats',
		Icon: i.Counter,
		path: '/tenant/stats',
		Component: PassThrough,
		Layout: TenantLayout,
		stack: '/tenant/stats',
		hasAccess: isTenant,
	}),
	TenantStatsHome: RouteFactory({
		title: 'Stats',
		Icon: i.Counter,
		path: '/tenant/stats/home',
		Component: FillerHomeFactory('Tenant Stats'),
		Layout: TenantLayout,
		stack: '/tenant/stats',
		hasAccess: isTenant,
	}),

	TenantUserStack: RouteFactory({
		title: 'Users',
		Icon: i.Auth,
		path: '/tenant/users',
		Component: PassThrough,
		Layout: TenantLayout,
		stack: '/tenant/users',
		hasAccess: isTenant,
	}),
	TenantUserHome: RouteFactory({
		title: 'Users',
		Icon: i.Auth,
		path: '/tenant/users/home',
		Component: FillerHomeFactory('Tenant Users Home'),
		Layout: TenantLayout,
		stack: '/tenant/users',
		hasAccess: isTenant,
	}),
	TenantUserList: RouteFactory({
		title: 'User List',
		Icon: i.Auth,
		path: '/tenant/users/list',
		Component: FillerListFactory('Tenant User List'),
		Layout: TenantLayout,
		stack: '/tenant/users',
		hasAccess: isTenant,
	}),
	TenantUserEntry: RouteFactory({
		title: '',
		Icon: i.Auth,
		path: '/tenant/users/entry',
		Component: FillerEntryFactory('Tenant User'),
		Layout: TenantLayout,
		stack: '/tenant/users',
		hasAccess: isTenant,
	}),

	TenantPropertyStack: RouteFactory({
		title: 'Properties',
		Icon: i.Building,
		path: '/tenant/properties',
		Component: PassThrough,
		Layout: TenantLayout,
		stack: '/tenant/properties',
		hasAccess: isTenant,
	}),
	TenantPropertyHome: RouteFactory({
		title: 'Properties',
		Icon: i.Building,
		path: '/tenant/properties/home',
		Component: FillerHomeFactory('Tenant Properties'),
		Layout: TenantLayout,
		stack: '/tenant/properties',
		hasAccess: isTenant,
	}),
	TenantPropertyList: RouteFactory({
		title: 'Property List',
		Icon: i.Building,
		path: '/tenant/properties/list',
		Component: FillerListFactory('Tenant Property List'),
		Layout: TenantLayout,
		stack: '/tenant/properties',
		hasAccess: isTenant,
	}),
	TenantPropertyEntry: RouteFactory({
		title: '',
		Icon: i.Building,
		path: '/tenant/properties/entry',
		Component: FillerEntryFactory('Tenant Property'),
		Layout: TenantLayout,
		stack: '/tenant/properties',
		hasAccess: isTenant,
	}),

	TenantTaskStack: RouteFactory({
		title: 'Tasks',
		Icon: i.Tasks,
		path: '/tenant/tasks',
		Component: PassThrough,
		Layout: TenantLayout,
		stack: '/tenant/tasks',
		hasAccess: isTenant,
	}),
	TenantTaskHome: RouteFactory({
		title: 'Tasks',
		Icon: i.Tasks,
		path: '/tenant/tasks/home',
		Component: FillerHomeFactory('Tenant Tasks'),
		Layout: TenantLayout,
		stack: '/tenant/tasks',
		hasAccess: isTenant,
	}),
	TenantTaskList: RouteFactory({
		title: 'Task List',
		Icon: i.Tasks,
		path: '/tenant/tasks/list',
		Component: FillerListFactory('Tenant Task List'),
		Layout: TenantLayout,
		stack: '/tenant/tasks',
		hasAccess: isTenant,
	}),
	TenantTaskEntry: RouteFactory({
		title: '',
		Icon: i.Tasks,
		path: '/tenant/tasks/entry',
		Component: FillerEntryFactory('Tenant Task'),
		Layout: TenantLayout,
		stack: '/tenant/tasks',
		hasAccess: isTenant,
	}),

	NotFound: RouteFactory({
		title: 'Not Found',
		path: '/notfound',
		Component: lazy(() => import('~/pages/NotFound')),
	}),
})


export const routesByPath = Object.fromEntries(Object.values(routes).map(r => [r.path, r]))
// @ts-ignore: Maybe fix later
export const Paths: Record<keyof typeof routes, string> = Object.fromEntries(Object.entries(routes).map(([name, r]) => [name, r.path]))


function isAdmin() { return AuthCtx.get().roles.includes(AuthCtx.roles.admin) }
function isTenant() { return AuthCtx.get().roles.includes(AuthCtx.roles.tenant)}