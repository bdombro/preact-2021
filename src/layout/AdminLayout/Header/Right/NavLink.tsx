import { h } from 'preact'

import { SidebarRightCtx } from '~/App.context'
import styles from '~/layout/MarketingLayout/Header/Right/NavLink.module.css'
import { useLocation } from '~/layout/routing'

export default function NavLink({ uri, text }: { uri: string, text: string }) {
  const location = useLocation()
  const [isSidebarActive] = SidebarRightCtx.use()
  const isLinkActive = location.pathname.startsWith(uri)
  return (
    <a 
      class={`${styles.navlink} ${styles.hideOnMobile}  ${isLinkActive && !isSidebarActive && styles.active}`}
      href={uri + (isLinkActive ? '?stack=reset' : '')}
    >
      {text}
    </a>
  )
}
