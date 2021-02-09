import { h } from 'preact'

import SidebarLayout from '~/layout/layout/SidebarLayout'
import * as i from '~/lib/icons'
import { routes } from '~/routes'

export default function TenantLayout({ children }: { children: any }) {
	return (
		<SidebarLayout
			topLinks={[routes.Support]}
			rightLinks={[
				routes.TenantStatsStack,
				routes.TenantTaskStack,
				routes.TenantPropertyStack,
				routes.TenantUserStack,
				routes.TenantSettingsHome,
				routes.Support,
				routes.Logout,
				{ path: '#theme-toggle', title: 'Theme', Icon: i.Palette },
			]}
			bottomLinks={[
				routes.TenantStatsStack,
				routes.TenantTaskStack,
				routes.TenantPropertyStack,
				routes.TenantUserStack,
				routes.TenantSettingsHome,
			]}
			leftLinks={[
				routes.TenantStatsStack,
				routes.TenantTaskStack,
				routes.TenantPropertyStack,
				routes.TenantUserStack,
			]}
		>
			{children}
		</SidebarLayout>
	)
}
