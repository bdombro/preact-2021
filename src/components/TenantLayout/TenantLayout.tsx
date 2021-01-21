import '../AdminLayout/AdminLayout.css'
import { h } from 'preact'
import lazy from '../lazy'

const BottomNav = lazy(() => import('./BottomNav'))
const Header = lazy(() => import('./Header'))
const Sidebar = lazy(() => import('./Sidebar'))
const SidebarRight = lazy(() => import('./SidebarRight'))

export default function TenantLayout({ children }: { children: any }) {
  return <div id="adminLayout">
    <Header />
    <Sidebar />
    <SidebarRight />
    <BottomNav />
    <div id="content">
      {children}
    </div>
  </div>
}
