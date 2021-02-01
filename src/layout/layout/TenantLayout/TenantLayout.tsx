import '../AdminLayout/AdminLayout.css'

import { h } from 'preact'
import { useRef } from 'preact/hooks'

import { ErrorBoundary } from '~/layout/components/ErrorBoundaries'
import * as i from '~/lib/icons'
import lazy from '~/lib/lazy'
import useMedia from '~/lib/useMedia'
import { Paths } from '~/routes'

const Navbar = lazy(() => import('~/layout/components/Navbar'))
const Sidebar = lazy(() => import('~/layout/components/Sidebar'))
const SidebarRight = lazy(() => import('~/layout/components/SidebarRight'))
const BottomNav = lazy(() => import('~/layout/components/BottomNav'))

export default function TenantLayout({ children }: { children: any }) {
	const isWide = useMedia('(min-width: 600px)')
	const ref = useRef<HTMLDivElement>(null)

	return (
		<div class="adminLayout" ref={ref}>
			<Navbar sidebarLeft navLinks={[{ uri: Paths.Support, text: 'Need Help?' }]} />
			{isWide && <Sidebar navLinks={[
				{ uri: Paths.TenantStatsHome, text: 'Stats', Icon: i.Counter },
				{ uri: Paths.TenantTasksStack, text: 'Tasks', Icon: i.Post },
				{ uri: Paths.TenantPropertiesStack, text: 'Properties', Icon: i.Building },
				{ uri: Paths.TenantUserStack, text: 'Users', Icon: i.Auth },
			]} />}
			<SidebarRight
				navLinks={[
					{ uri: Paths.TenantStatsHome, text: 'Stats', Icon: i.Counter },
					{ uri: Paths.TenantTasksStack, text: 'Tasks', Icon: i.Post },
					{ uri: Paths.TenantPropertiesStack, text: 'Properties', Icon: i.Building },
					{ uri: Paths.TenantUserStack, text: 'Users', Icon: i.Auth },
					{ uri: Paths.TenantSettingsHome, text: 'Settings', Icon: i.Account },
					{ uri: Paths.Support, text: 'Get Help', Icon: i.Info },
					{ uri: Paths.Logout, text: 'Logout', Icon: i.Logout },
					{ uri: '#theme-toggle', text: 'Theme', Icon: i.Palette },
				]}
			/>
			{!isWide && <BottomNav navLinks={[
				{ uri: Paths.TenantStatsHome, text: 'Stats', Icon: i.Counter },
				{ uri: Paths.TenantTasksStack, text: 'Tasks', Icon: i.Post },
				{ uri: Paths.TenantPropertiesStack, text: 'Properties', Icon: i.Building },
				{ uri: Paths.TenantUserStack, text: 'Users', Icon: i.Auth },
			]} />}
			<div id="content">
				<ErrorBoundary>
					{children}
				</ErrorBoundary>
			</div>
		</div>
	)
}
