import { h } from 'preact'

import * as i from '~/layout/icons'
import styles from '~/layout/MarketingLayout/SidebarRight/Nav.module.css'
import { useLocation } from '~/layout/routing'
import { Paths } from '~/routes/routes'

export default function Nav() {
  const { pathname } = useLocation()
  return <nav class={styles.nav}>
    <NavLink uri={Paths.TenantStatsStack} text='Stats' Icon={i.Counter} isActive={isActive(Paths.TenantStatsStack)} />
    <NavLink uri={Paths.TenantTasksStack} text='Tasks' Icon={i.Tasks} isActive={isActive(Paths.TenantTasksStack)} />
    <NavLink uri={Paths.TenantPropertiesStack} text='Properties' Icon={i.Building} isActive={isActive(Paths.TenantPropertiesStack)} />
    <NavLink uri={Paths.TenantUserStack} text='Users' Icon={i.Auth} isActive={isActive(Paths.TenantUserStack)} />
  </nav>

  function isActive(uri: string) {
    return pathname.startsWith(uri)
  }
}

function NavLink({ uri, text, Icon, isActive }: { uri: string, text: string, Icon: any, isActive: boolean }) {
  return (
    <a
      href={uri + (isActive ? '?stack=reset' : '')}
      class={`${styles.navlink} ${isActive && styles.active}`}
    >
      <div class={styles.navlinkIcon}><Icon /></div>
      <div class={styles.navlinkText}>{text}</div>
    </a>
  )
}