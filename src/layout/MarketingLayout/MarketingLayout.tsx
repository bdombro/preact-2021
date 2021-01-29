import './MarketingLayout.css'

import { h } from 'preact'

import lazy from '~/layout/lazy'

const Header = lazy(() => import('./Header/Header'))
const SidebarRight = lazy(() => import('./SidebarRight/SidebarRight'))

export default function MarketingLayout({ children }: { children: any }) {
  return (
    <div id="marketingLayout">
      <Header />
      <SidebarRight />
      <div id="content">
        {children}
      </div>
    </div>
  )
}
