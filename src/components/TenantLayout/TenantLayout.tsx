import '../AdminLayout/AdminLayout.css'
import { h } from 'preact'
import lazy from '../../lib/lazy'
import { ContextProvider } from './context'

const BottomNav = lazy(() => import('./BottomNav'))
const Header = lazy(() => import('./Header'))
const Sidebar = lazy(() => import('./Sidebar'))
const SidebarRight = lazy(() => import('./SidebarRight'))

export default function TenantLayout({ children }: { children: any }) {
  return (
    <ContextProvider>
      <div id="layout" class="adminLayout">
        <Header />
        <Sidebar />
        <SidebarRight />
        <BottomNav />
        <div id="content">
          {children}
        </div>
      </div>
    </ContextProvider>
  )
}
