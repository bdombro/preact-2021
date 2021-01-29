import { h } from 'preact'

import styles from '~/layout/MarketingLayout/Header/Right/NavLink.module.css'
import { useLocation } from '~/layout/routing'

import { useSidebarState } from '../../SidebarRight/SidebarRight'


export default function NavLink({ uri, text }: { uri: string, text: string }) {
  const location = useLocation()
  const [isSidebarActive] = useSidebarState()
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
