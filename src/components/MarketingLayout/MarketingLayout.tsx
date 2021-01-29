import './MarketingLayout.css'
import { h } from 'preact'
import lazy from '~/lib/lazy'
import { ContextProvider } from './context'

const Header = lazy(() => import('./Header/Header'))
const SidebarRight = lazy(() => import('./SidebarRight/SidebarRight'))

export default function MarketingLayout({ children }: { children: any }) {
  return (
    <ContextProvider>
      <div id="marketingLayout">
        <Header />
        <SidebarRight />
        <div id="content">
          {children}
        </div>
      </div>
    </ContextProvider>
  )
}
