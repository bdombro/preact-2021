import { h } from 'preact'

import styles from '~/layout/MarketingLayout/Header/Right/NavLink.module.css'
import { useLocation } from '~/layout/routing'

import { useSidebarState } from '../../SidebarRight/SidebarRight'


export default function NavLink({ uri, text }: { uri: string, text: string }) {
  const location = useLocation()
  const [isSidebarActive] = useSidebarState()
  const isActive = location.pathname.startsWith(uri)
  return (
    <a class={`${styles.navlink} ${styles.hideOnMobile} ${isActive && !isSidebarActive && styles.active}`}
      href={uri + (isActive ? '?stack=reset' : '')}
    >
      {text}
    </a>
  )
}
