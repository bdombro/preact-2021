import { h } from 'preact'
import { useLayoutEffect } from 'preact/hooks'

import { ThemeCtx } from '~/App.context'
import SidebarLayout from '~/layout/layout/SidebarLayout'
import * as i from '~/lib/icons'
import { routes } from '~/routes'

import { applyTheme, defaultTheme } from '../theme'

export default function AdminLayout({ children }: { children: any }) {
	useLayoutEffect(() => applyTheme(defaultTheme))
	return (
		<SidebarLayout 
			topLinks={[{...routes.Support, title: 'Need help?'}]}
			rightLinks={[
				routes.AdminStatsStack,
				routes.AdminBlogStack,
				routes.AdminUserStack,
				routes.AdminSettingsHome,
				routes.Logout,
				routes.Support,
				{ path: '#theme-toggle', title: 'Dark Mode', Icon: i.Palette },
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
