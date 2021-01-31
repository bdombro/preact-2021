import { h } from 'preact'

import { SidebarRightCtx } from '~/App.context'
import styles from '~/layout/AdminLayout/BottomNav/NavLink.module.css'
import useLocation from '~/layout/routing/useLocation'

export default function NavLink({ uri, Icon }: { uri: string, Icon: any }) {
  const location = useLocation()
  const [isSidebarActive] = SidebarRightCtx.use()
  const isActive = location.pathname.startsWith(uri)
  return (
    <a class={`${styles.navlink} ${isActive && !isSidebarActive && styles.active}`}
      href={uri + (isActive ? '?stack=reset' : '')}
    >
      <div><Icon /></div>
    </a>
  )
}