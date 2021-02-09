import FillerEntryRoute from '~/layout/FillerEntryRoute'
import FillerHomeRoute from '~/layout/FillerHomeRoute'
import FillerListRoute from '~/layout/FillerListRoute'
import FillerPageRoute from '~/layout/FillerPageRoute'
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
		Component: FillerPageRoute,
		Layout: MarketingLayout,
	}),
	Support: RouteFactory({
		title: 'Support',
		Icon: i.Info,
		path: '/support',
		Component: FillerPageRoute,
		Layout: MarketingLayout,
	}),
	About: RouteFactory({
		title: 'About',
		Icon: i.Info,
		path: '/about',
		Component: FillerPageRoute,
		Layout: MarketingLayout,
	}),
	Blog: RouteFactory({
		title: 'Blog',
		Icon: i.Post,
		path: '/blog',
		Component: FillerPageRoute,
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
		Component: FillerPageRoute,
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
		Component: FillerPageRoute,
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
		Component: FillerHomeRoute,
		Layout: AdminLayout,
		stack: '/admin/users',
		hasAccess: isAdmin,
	}),
	AdminUserList: RouteFactory({
		title: 'User List',
		Icon: i.Auth,
		path: '/admin/users/list',
		Component: FillerListRoute,
		Layout: AdminLayout,
		stack: '/admin/users',
		hasAccess: isAdmin,
	}),
	AdminUserEntry: RouteFactory({
		title: '',
		Icon: i.Auth,
		path: '/admin/users/entry',
		Component: FillerEntryRoute,
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
		Component: FillerHomeRoute,
		Layout: AdminLayout,
		stack: '/admin/blog',
		hasAccess: isAdmin,
	}),
	AdminBlogPostList: RouteFactory({
		title: 'Posts',
		Icon: i.Post,
		path: '/admin/blog/list',
		Component: FillerListRoute,
		Layout: AdminLayout,
		stack: '/admin/blog',
		hasAccess: isAdmin,
	}),
	AdminBlogPostEntry: RouteFactory({
		title: '',
		Icon: i.Post,
		path: '/admin/blog/entry',
		Component: FillerEntryRoute,
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
		Component: FillerPageRoute,
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
		Component: FillerPageRoute,
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
		Component: FillerHomeRoute,
		Layout: TenantLayout,
		stack: '/tenant/users',
		hasAccess: isTenant,
	}),
	TenantUserList: RouteFactory({
		title: 'User List',
		Icon: i.Auth,
		path: '/tenant/users/list',
		Component: FillerListRoute,
		Layout: TenantLayout,
		stack: '/tenant/users',
		hasAccess: isTenant,
	}),
	TenantUserEntry: RouteFactory({
		title: '',
		Icon: i.Auth,
		path: '/tenant/users/entry',
		Component: FillerEntryRoute,
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
		Component: FillerHomeRoute,
		Layout: TenantLayout,
		stack: '/tenant/properties',
		hasAccess: isTenant,
	}),
	TenantPropertyList: RouteFactory({
		title: 'Property List',
		Icon: i.Building,
		path: '/tenant/properties/list',
		Component: FillerListRoute,
		Layout: TenantLayout,
		stack: '/tenant/properties',
		hasAccess: isTenant,
	}),
	TenantPropertyEntry: RouteFactory({
		title: '',
		Icon: i.Building,
		path: '/tenant/properties/entry',
		Component: FillerEntryRoute,
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
		Component: FillerHomeRoute,
		Layout: TenantLayout,
		stack: '/tenant/tasks',
		hasAccess: isTenant,
	}),
	TenantTaskList: RouteFactory({
		title: 'Task List',
		Icon: i.Tasks,
		path: '/tenant/tasks/list',
		Component: FillerListRoute,
		Layout: TenantLayout,
		stack: '/tenant/tasks',
		hasAccess: isTenant,
	}),
	TenantTaskEntry: RouteFactory({
		title: '',
		Icon: i.Tasks,
		path: '/tenant/tasks/entry',
		Component: FillerEntryRoute,
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