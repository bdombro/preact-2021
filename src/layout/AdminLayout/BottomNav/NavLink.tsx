import { h } from 'preact'

import { SidebarRightCtx } from '~/App.context'
import styles from '~/layout/AdminLayout/BottomNav/NavLink.module.css'
import useLocation from '~/layout/useLocation'

const useSidebarRight = SidebarRightCtx.use

export default function NavLink({ uri, Icon }: { uri: string, Icon: any }) {
  const location = useLocation()
  const [isSidebarActive] = useSidebarRight()
  const isActive = location.pathname.startsWith(uri)
  return (
    <a class={`${styles.navlink} ${isActive && !isSidebarActive && styles.active}`}
      href={uri + (isActive ? '?stack=reset' : '')}
    >
      <div><Icon /></div>
    </a>
  )
}