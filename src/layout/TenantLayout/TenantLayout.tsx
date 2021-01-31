import '../AdminLayout/AdminLayout.css'

import { h } from 'preact'
import { useRef } from 'preact/hooks'

import lazy from '~/layout/lazy'
import useMedia from '~/layout/useMedia'

const BottomNav = lazy(() => import('./BottomNav/BottomNav'))
const Header = lazy(() => import('./Header/Header'))
const Sidebar = lazy(() => import('./Sidebar/Sidebar'))
const SidebarRight = lazy(() => import('./SidebarRight/SidebarRight'))

export default function TenantLayout({ children }: { children: any }) {
  const isWide = useMedia('(min-width: 600px)')
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div class="adminLayout" ref={ref}>
      <Header />
      {isWide && <Sidebar />}
      <SidebarRight />
      {!isWide && <BottomNav />}
      <div id="content">
        {children}
      </div>
    </div>
  )
}
