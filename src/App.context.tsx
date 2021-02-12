import { ComponentChildren, FunctionComponent, h } from 'preact'

import { createStateContext } from './lib/createStateContext'
import { navListener } from './lib/router'

const bc = document.body.classList
const ls = {
	get: (key: string) => localStorage.getItem(key),
	set: (key: string, val: string) => localStorage.setItem(key, val),
}

// ThemeCtx: can be dark | light, persists to disk, and can be toggled with #theme-toggle event

export const ThemeCtx = createStateContext(ls.get('ThemeCtx') === 'dark' ? 'dark' : 'light')
window.addEventListener('#theme-toggle', () => ThemeCtx.set(current => current === 'dark' ? 'light' : 'dark'))
ThemeCtx.subscribe(next => ls.set('ThemeCtx', next))


// SidebarLeftCtx: can be full | mini, persists to disk, and can be toggled with #sidebar-toggle event

export const SidebarLeftCtx = createStateContext(ls.get('SidebarLeftCtx') || 'full')
window.addEventListener('#sidebar-toggle', () => SidebarLeftCtx.set(current => current === 'mini' ? 'full' : 'mini'))
SidebarLeftCtx.subscribe(next => ls.set('SidebarLeftCtx', next))
SidebarLeftCtx.subscribe(next => next === 'mini' ? bc.add('miniSidebar') : bc.remove('miniSidebar'))
if (ls.get('SidebarLeftCtx') === 'mini') bc.add('miniSidebar')


// SidebarRightCtx: can be active or inactive, resets on navigation

export const SidebarRightCtx = createStateContext(false)
navListener(() => SidebarRightCtx.set(false))
ThemeCtx.subscribe(() => SidebarRightCtx.set(false))


// AuthCtx: user id and roles

export interface AuthCtxType { id: string, roles: Roles[], tenants: string[], currentTenant: string }
const AuthCtxLoggedOut: AuthCtxType = { id: '', roles: [], tenants: [], currentTenant: '' }
enum Roles { admin, tenant }
const AuthCtxBase = createStateContext<typeof AuthCtxLoggedOut>(ls.get('AuthCtx') ? JSON.parse(ls.get('AuthCtx')!) : AuthCtxLoggedOut)
export const AuthCtx = Object.assign(AuthCtxBase, {
	logout() { AuthCtx.set(AuthCtxLoggedOut) },
	loginAsAdmin() { AuthCtx.set({ id: '1', roles: [Roles.admin], tenants: [], currentTenant: '' }) },
	loginAsTenant() { AuthCtx.set({ id: '2', roles: [Roles.tenant], tenants: ['123', '311'], currentTenant: '123' }) },
	roles: Roles,
})
AuthCtx.subscribe(next => ls.set('AuthCtx', JSON.stringify(next)))


// Providers

export function CtxProviders ({children}: {children: ComponentChildren}) {
	return (
		<AuthCtx.Provider>
			<ThemeCtx.Provider>
				<SidebarLeftCtx.Provider>
					<SidebarRightCtx.Provider>
						{children}
					</SidebarRightCtx.Provider>
				</SidebarLeftCtx.Provider>
			</ThemeCtx.Provider>
		</AuthCtx.Provider>
	)
}