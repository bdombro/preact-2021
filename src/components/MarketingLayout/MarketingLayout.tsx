import './MarketingLayout.css'
import { h } from 'preact'
import lazy from '../lazy'

const Header = lazy(() => import('./Header'))
const SidebarRight = lazy(() => import('./SidebarRight'))

export default function MarketingLayout({ children }: { children: any }) {
  return <div id="marketingLayout">
    <Header />
    <SidebarRight />
    <div id="content">
      {children}
    </div>
  </div>
}
