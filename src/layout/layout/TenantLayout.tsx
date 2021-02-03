import { h } from 'preact'

import DashboardLayoutDiv from '~/layout/components/DashboardLayoutDiv'
import { ErrorBoundary } from '~/layout/components/ErrorBoundaries'
import * as i from '~/lib/icons'
// import lazy from '~/lib/lazy'
import useMedia from '~/lib/useMedia'
import { Paths } from '~/routes'

import BottomNav from '../components/BottomNav'
import ContentDiv from '../components/ContentDiv'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import SidebarRight from '../components/SidebarRight'

export default function TenantLayout({ children }: { children: any }) {
	const isWide = useMedia('(min-width: 600px)')

	return (
		<DashboardLayoutDiv>
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
			<ContentDiv>
				<ErrorBoundary>
					{children}
				</ErrorBoundary>
			</ContentDiv>
		</DashboardLayoutDiv>
	)
}
