import './MarketingLayout.css'

import { h } from 'preact'

import lazy from '~/layout/lazy'
import { Paths } from '~/routes/routes'

const Navbar = lazy(() => import('~/components/Navbar'))
const SidebarRight = lazy(() => import('./SidebarRight/SidebarRight'))

export default function MarketingLayout({ children }: { children: any }) {
  return (
    <div id="marketingLayout">
      <Navbar 
        navLinks={[
          {uri: Paths.Blog, text: 'Blog'},
          {uri: Paths.Login, text: 'Login' },
        ]}
      />
      <SidebarRight />
      <div id="content">
        {children}
      </div>
    </div>
  )
}
