import { h } from 'preact'

import SidebarLayout from '~/layout/components/SidebarLayout'
import * as i from '~/lib/icons'
import { routes } from '~/routes'

export default function AdminLayout({ children }: { children: any }) {
	return (
		<SidebarLayout 
			topLinks={[routes.Support]}
			rightLinks={[
				routes.AdminStatsStack,
				routes.AdminBlogStack,
				routes.AdminUserStack,
				routes.AdminSettingsHome,
				routes.Support,
				routes.Logout,
				{ path: '#theme-toggle', title: 'Theme', Icon: i.Palette },
			]}
			bottomLinks={[
				routes.AdminStatsStack,
				routes.AdminBlogStack,
				routes.AdminUserStack,
			]}
			leftLinks={[
				routes.AdminStatsStack,
				routes.AdminBlogStack,
				routes.AdminUserStack,
			]}
		>
			{children}
		</SidebarLayout>
	)
}
