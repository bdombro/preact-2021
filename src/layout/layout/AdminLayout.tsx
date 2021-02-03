// import './AdminLayout.css'

import { h } from 'preact'

import DashboardLayoutDiv from '~/layout/components/DashboardLayoutDiv'
import { ErrorBoundary } from '~/layout/components/ErrorBoundaries'
import * as i from '~/lib/icons'
// import lazy from '~/lib/lazy'
import useMedia from '~/lib/useMedia'
import { Paths } from '~/routes'

import BottomNav from '../components/BottomNav'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import SidebarRight from '../components/SidebarRight'

export default function AdminLayout({ children }: { children: any }) {
	const isWide = useMedia('(min-width: 600px)')
  
	return (
		<DashboardLayoutDiv>
			<Navbar sidebarLeft navLinks={[{ uri: Paths.Support, text: 'Need Help?' }]} />
			{isWide && <Sidebar navLinks={[
				{ uri: Paths.AdminStatsHome, text: 'Stats', Icon: i.Counter },
				{ uri: Paths.AdminBlogStack, text: 'Blog', Icon: i.Post },
				{ uri: Paths.AdminUserStack, text: 'Users', Icon: i.Auth },
			]}/>}
			<SidebarRight navLinks={[
				{ uri: Paths.AdminStatsHome, text: 'Stats', Icon: i.Counter },
				{ uri: Paths.AdminBlogStack, text: 'Blog', Icon: i.Post },
				{ uri: Paths.AdminUserStack, text: 'Users', Icon: i.Auth },
				{ uri: Paths.AdminSettingsHome, text: 'Settings', Icon: i.Account },
				{ uri: Paths.Support, text: 'Get Help', Icon: i.Info },
				{ uri: Paths.Logout, text: 'Logout', Icon: i.Logout },
				{ uri: '#theme-toggle', text: 'Theme', Icon: i.Palette },
			]}/>
			{!isWide && <BottomNav navLinks={[
				{ uri: Paths.AdminStatsHome, text: 'Stats', Icon: i.Counter },
				{ uri: Paths.AdminBlogStack, text: 'Blog', Icon: i.Post },
				{ uri: Paths.AdminUserStack, text: 'Users', Icon: i.Auth },
			]} />}
			<div id="content">
				<ErrorBoundary>
					{children}
				</ErrorBoundary>
			</div>
		</DashboardLayoutDiv>
	)
}
