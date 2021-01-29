import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import styles from '~/layout/AdminLayout/BottomNav/BottomNav.module.css'
import * as i from '~/layout/icons'
import { useLocation } from '~/layout/routing'
import { Paths } from '~/routes/router'

import { useLayoutState } from '../context'

export default function Nav() {
  return <nav class={styles.nav}>
    <NavLink uri={Paths.TenantStatsStack} Icon={i.Counter} />
    <NavLink uri={Paths.TenantTasksStack} Icon={i.Tasks} />
    <NavLink uri={Paths.TenantPropertiesStack} Icon={i.Building} />
    <NavLink uri={Paths.TenantUserStack} Icon={i.Auth} />
    <NavBurger />
  </nav>
}

function NavLink({ uri, Icon }: { uri: string, Icon: any }) {
  const location = useLocation()
  const [isSidebarActive] = useLayoutState().sidebarRight
  const isActive = location.pathname.startsWith(uri)
  return (
    <a class={`${styles.navlink} ${isActive && !isSidebarActive && styles.active}`}
      href={uri + (isActive ? '?stack=reset' : '')}
    >
      <div><Icon /></div>
    </a>
  )
}

/**
 * This is a little more complex than the Marketing Navburger, b/c it can have a diff
 * state than sidebarRight b/c the sidebar can also be activated in the 
 * Header->Right->Navburger. The added complexity allows NavBurger to handle this
 * gracefully.
 */
function NavBurger() {
  const [isActive, setIsActive] = useState(false)
  const [isSidebarActive, setIsSidebarActive] = useLayoutState().sidebarRight
  useEffect(() => {
    if (!isSidebarActive) setIsActive(false)
  }, [isSidebarActive])
  return (
    <a class={`${styles.navlink} ${isActive && styles.active}`}
      href="#toggle-sidebar-right"
      onClick={() => {
        setIsActive(isActive => {
          setIsSidebarActive(!isActive)
          return !isActive
        })
      }}
    >
      <div>{isActive ? 'X' : 'Ξ'}</div>
    </a>
  )
}