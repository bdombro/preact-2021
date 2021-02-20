import { h } from 'preact'
import { useLayoutEffect } from 'preact/hooks'

import SidebarLayout from '~/layout/layout/SidebarLayout'
import * as i from '~/lib/icons'
import { routes } from '~/routes'

import { applyTheme, tenantDemoTheme } from '../theme'

export default function TenantLayout({ children }: { children: any }) {
	useLayoutEffect(() => applyTheme(tenantDemoTheme))
	return (
		<SidebarLayout
			topLinks={[{ ...routes.Support, title: 'Need help?' }]}
			rightLinks={[
				routes.TenantDashboardStack,
				routes.TenantTaskStack,
				routes.TenantPropertyStack,
				routes.TenantUserStack,
				routes.TenantSettingsHome,
				routes.Logout,
				routes.Support,
				{ path: '#theme-toggle', title: 'Theme', Icon: i.Palette },
			]}
			bottomLinks={[
				routes.TenantDashboardStack,
				routes.TenantTaskStack,
				routes.TenantPropertyStack,
				routes.TenantUserStack,
				routes.TenantSettingsHome,
			]}
			leftLinks={[
				routes.TenantDashboardStack,
				routes.TenantTaskStack,
				routes.TenantPropertyStack,
				routes.TenantUserStack,
			]}
		>
			{children}
		</SidebarLayout>
	)
}
