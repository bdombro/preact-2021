// import './AdminLayout.css'

import { h } from 'preact'

import DashboardLayoutDiv from '~/layout/components/DashboardLayoutDiv'
import * as i from '~/lib/icons'
import { ContentDiv } from '~/lib/router'
import useMedia from '~/lib/useMedia'
import { routes } from '~/routes'

import BottomNav from '../components/BottomNav'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import SidebarRight from '../components/SidebarRight'

export default function AdminLayout({ children }: { children: any }) {
	const isWide = useMedia('(min-width: 600px)')
  
	return (
		<DashboardLayoutDiv>
			<Navbar sidebarLeft navLinks={[routes.Support]} />
			{isWide && <Sidebar navLinks={[
				routes.AdminStatsStack,
				routes.AdminBlogStack,
				routes.AdminUserStack,
			]}/>}
			<SidebarRight navLinks={[
				routes.AdminStatsStack,
				routes.AdminBlogStack,
				routes.AdminUserStack,
				routes.AdminSettingsHome,
				routes.Support,
				routes.Logout,
				{ path: '#theme-toggle', title: 'Theme', Icon: i.Palette },
			]}/>
			{!isWide && <BottomNav navLinks={[
				routes.AdminStatsStack,
				routes.AdminBlogStack,
				routes.AdminUserStack,
			]} />}
			<ContentDiv>
				{children}
			</ContentDiv>
		</DashboardLayoutDiv>
	)
}
