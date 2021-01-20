import './DashboardLayout.css'
import { h } from 'preact'

import BottomNav from '~/components/DashboardLayout/BottomNav'
import DesktopHeader from '~/components/DashboardLayout/DesktopHeader'
import MobileHeader from '~/components/DashboardLayout/MobileHeader'
import Sidebar from '~/components/DashboardLayout/Sidebar'
import SidebarRight from '~/components/DashboardLayout/SidebarRight'

export default function DashboardLayout({ children }: { children: any }) {
  return <div id="dashboardLayout">
    <DesktopHeader />
    <MobileHeader />
    <Sidebar />
    <SidebarRight />
    <BottomNav />
    <div id="content">
      {children}
    </div>
  </div>
}
