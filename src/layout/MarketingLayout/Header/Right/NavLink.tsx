import { h } from 'preact'

import { useLocation } from '~/layout/routing'

import { useSidebarState } from '../../SidebarRight/SidebarRight'
import styles from  './NavLink.module.css'


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
