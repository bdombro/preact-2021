import '../AdminLayout/AdminLayout.css'

import { h } from 'preact'
import { useRef } from 'preact/hooks'

import lazy from '~/layout/lazy'
import useMedia from '~/layout/useMedia'
import { Paths } from '~/routes/routes'

const Navbar = lazy(() => import('~/components/Navbar'))
const Sidebar = lazy(() => import('./Sidebar/Sidebar'))
const SidebarRight = lazy(() => import('./SidebarRight/SidebarRight'))
const BottomNav = lazy(() => import('./BottomNav/BottomNav'))

export default function TenantLayout({ children }: { children: any }) {
  const isWide = useMedia('(min-width: 600px)')
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div class="adminLayout" ref={ref}>
      <Navbar sidebarLeft navLinks={[{ uri: Paths.Support, text: 'Need Help?' }]} />
      {isWide && <Sidebar />}
      <SidebarRight />
      {!isWide && <BottomNav />}
      <div id="content">
        {children}
      </div>
    </div>
  )
}
