import { h } from 'preact'

import * as i from '~/layout/icons'
import styles from '~/layout/MarketingLayout/SidebarRight/Nav.module.css'
import { useLocation } from '~/layout/routing'
import { Paths } from '~/routes/router'

export default function Nav() {
  const { pathname } = useLocation()
  return <nav class={styles.nav}>
    <NavLink uri={Paths.AdminStatsStack} text='Stats' Icon={i.Counter} isActive={isActive(Paths.AdminStatsStack)} />
    <NavLink uri={Paths.AdminBlogStack} text='Auth' Icon={i.Auth} isActive={isActive(Paths.AdminBlogStack)} />
    <NavLink uri={Paths.AdminUserStack} text='Blog' Icon={i.Post} isActive={isActive(Paths.AdminUserStack)} />
  </nav>

  function isActive(uri: string) {
    return pathname.startsWith(uri)
  }
}


function NavLink({uri, text, Icon, isActive}: {uri: string, text: string, Icon: any, isActive: boolean}) {
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