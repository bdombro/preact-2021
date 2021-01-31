import { h } from 'preact'

import * as i from '~/layout/icons'
import styles from '~/layout/MarketingLayout/SidebarRight/Nav.module.css'
import NavLink from '~/layout/MarketingLayout/SidebarRight/NavLink'
import { useLocation } from '~/layout/routing'
import { Paths } from '~/routes/routes'

export default function Nav() {
  const { pathname } = useLocation()
  return <nav class={styles.nav}>
    <NavLink uri={Paths.AdminStatsStack} text='Stats' Icon={i.Counter} />
    <NavLink uri={Paths.AdminUserStack} text='Auth' Icon={i.Auth} />
    <NavLink uri={Paths.AdminBlogStack} text='Blog' Icon={i.Post} />
  </nav>

  function isActive(uri: string) {
    return pathname.startsWith(uri)
  }
}