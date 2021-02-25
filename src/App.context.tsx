import { ComponentChildren, h } from 'preact'

import type { ToastProps } from './layout/components/Toast'
import { createStateContext } from './lib/createStateContext'
import { nav, navListener, RouteHistoryReset, StackHistoriesReset } from './lib/router'
import { Paths } from './routes'

const bc = document.body.classList
const ls = {
	get: (key: string) => localStorage.getItem(key),
	set: (key: string, val: string) => localStorage.setItem(key, val),
}

// AuthCtx: user id and roles

export interface AuthCtxType { id: string, roles: Roles[], tenants: string[], currentTenant: string }
const AuthCtxLoggedOut: AuthCtxType = { id: '', roles: [], tenants: [], currentTenant: '' }
export enum Roles { admin, tenant }
const AuthCtxBase = createStateContext<typeof AuthCtxLoggedOut>(ls.get('AuthCtx') ? JSON.parse(ls.get('AuthCtx')!) : AuthCtxLoggedOut)
export const AuthCtx = Object.assign(AuthCtxBase, {
	logout() { 
		AuthCtx.set(AuthCtxLoggedOut) 
		StackHistoriesReset() 
		RouteHistoryReset() 
		ToastCtx.set({ message: 'You\'ve been logged out.', location: 'right' })
		nav(Paths.Login)
	},
	loginAsAdmin() { AuthCtx.set({ id: '1', roles: [Roles.admin], tenants: [], currentTenant: '' }) },
	loginAsTenant() { AuthCtx.set({ id: '2', roles: [Roles.tenant], tenants: ['123', '311'], currentTenant: '123' }) },
	roles: Roles,
})
AuthCtx.subscribe(next => ls.set('AuthCtx', JSON.stringify(next)))


// ThemeCtx: can be dark | light, persists to disk, and can be toggled with #theme-toggle event

export const ThemeCtx = createStateContext(ls.get('ThemeCtx') === 'dark' ? 'dark' : 'light')
window.addEventListener('#theme-toggle', () => ThemeCtx.set(current => current === 'dark' ? 'light' : 'dark'))
ThemeCtx.subscribe(next => ls.set('ThemeCtx', next))

// ToastCtx: display a Toast at the bottom or right of the page

export const ToastCtx = createStateContext<ToastProps>({ location: 'right', message: '', duration: 2e3 })

// SidebarLeftCtx: can be full | mini, persists to disk, and can be toggled with #sidebar-toggle event
const sidebarLeftInitial = ls.get('SidebarLeftCtx') || (window.innerWidth > 900 ? 'full' : 'mini')
export const SidebarLeftCtx = createStateContext(sidebarLeftInitial)
window.addEventListener('#sidebar-toggle', () => SidebarLeftCtx.set(current => current === 'mini' ? 'full' : 'mini'))
SidebarLeftCtx.subscribe(next => ls.set('SidebarLeftCtx', next))
SidebarLeftCtx.subscribe(next => next === 'mini' ? bc.add('miniSidebar') : bc.remove('miniSidebar'))
if (sidebarLeftInitial === 'mini') bc.add('miniSidebar')

// SidebarRightCtx: can be active or inactive, resets on navigation

export const SidebarRightCtx = createStateContext(false)
navListener(() => SidebarRightCtx.set(false))
ThemeCtx.subscribe(() => SidebarRightCtx.set(false))


// Providers

export function CtxProviders ({children}: {children: ComponentChildren}) {
	return (
		<AuthCtx.Provider>
			<ThemeCtx.Provider>
				<SidebarLeftCtx.Provider>
					<SidebarRightCtx.Provider>
						<ToastCtx.Provider>
							{children}
						</ToastCtx.Provider>
					</SidebarRightCtx.Provider>
				</SidebarLeftCtx.Provider>
			</ThemeCtx.Provider>
		</AuthCtx.Provider>
	)
}