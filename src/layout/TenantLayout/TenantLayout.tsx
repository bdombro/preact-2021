import '../AdminLayout/AdminLayout.css'

import { h } from 'preact'
import { useEffect, useRef } from 'preact/hooks'

import useMedia from '~/layout/useMedia'

import lazy from '../lazy'
import { ContextProvider } from './context'

const BottomNav = lazy(() => import('./BottomNav/BottomNav'))
const Header = lazy(() => import('./Header/Header'))
const Sidebar = lazy(() => import('./Sidebar/Sidebar'))
const SidebarRight = lazy(() => import('./SidebarRight/SidebarRight'))

export default function TenantLayout({ children }: { children: any }) {
  const isWide = useMedia('(min-width: 600px)')
  const ref = useRef<HTMLDivElement>(null)
  useEffect(listenForToggle, [])

  return (
    <ContextProvider>
      <div class="adminLayout" ref={ref}>
        <Header />
        {isWide && <Sidebar />}
        <SidebarRight />
        {!isWide && <BottomNav />}
        <div id="content">
          {children}
        </div>
      </div>
    </ContextProvider>
  )

  // Use event listeners instead of context, so that we don't trigger
  // unnecessary re-renders
  function listenForToggle() {
    const toggle = () => ref.current.classList.toggle('miniSidebar')
    const event = '#toggle-sidebar'
    window.addEventListener(event, toggle)
    return () => window.removeEventListener(event, toggle)
  }
}
