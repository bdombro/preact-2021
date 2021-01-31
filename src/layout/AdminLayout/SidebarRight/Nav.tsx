import { h } from 'preact'

import * as i from '~/layout/icons'
import styles from '~/layout/MarketingLayout/SidebarRight/Nav.module.css'
import NavLink from '~/layout/MarketingLayout/SidebarRight/NavLink'
import { Paths } from '~/routes/routes'

export default function Nav() {
  return <nav class={styles.nav}>
    <NavLink uri={Paths.AdminStatsStack} text='Stats' Icon={i.Counter} />
    <NavLink uri={Paths.AdminBlogStack} text='Blog' Icon={i.Post} />
    <NavLink uri={Paths.AdminUserStack} text='Auth' Icon={i.Auth} />
    <NavLink uri={Paths.AdminSettingsHome} text='Account'  Icon={i.Account} />
    <NavLink uri={Paths.Support} text='Help'  Icon={i.Info} />
    <NavLink uri={Paths.Logout} text='Logout' Icon={i.Logout} />
    <NavLink uri="#theme-toggle" text='Theme' Icon={i.Palette} />
  </nav>
}

