import { h } from 'preact'

import { SidebarRightCtx } from '~/App.context'
import { useLocation } from '~/layout/routing'

import styles from  './NavLink.module.css'


export default function NavLink({ uri, text }: { uri: string, text: string }) {
  const location = useLocation()
  const [isSidebarActive] = SidebarRightCtx.use()
  const isActive = location.pathname.startsWith(uri)
  return (
    <a class={`${styles.navlink} ${styles.hideOnMobile} ${isActive && !isSidebarActive && styles.active}`}
      href={uri + (isActive ? '?stack=reset' : '')}
    >
      {text}
    </a>
  )
}
