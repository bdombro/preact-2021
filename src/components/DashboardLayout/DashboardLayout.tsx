import './DashboardLayout.css'
import { h } from 'preact'
import lazy from '../lazy'

const BottomNav = lazy(() => import('./BottomNav'))
const Header = lazy(() => import('./Header'))
const Sidebar = lazy(() => import('./Sidebar'))
const SidebarRight = lazy(() => import('./SidebarRight'))

export default function DashboardLayout({ children }: { children: any }) {
  return <div id="dashboardLayout">
    <Header />
    <Sidebar />
    <SidebarRight />
    <BottomNav />
    <div id="content">
      {children}
    </div>
  </div>
}
