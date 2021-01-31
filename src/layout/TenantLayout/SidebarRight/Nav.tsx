import { h } from 'preact'

import * as i from '~/layout/icons'
import styles from '~/layout/MarketingLayout/SidebarRight/Nav.module.css'
import NavLink from '~/layout/MarketingLayout/SidebarRight/NavLink'
import { Paths } from '~/routes/routes'

export default function Nav() {
  return <nav class={styles.nav}>
    <NavLink uri={Paths.TenantStatsStack} text='Stats' Icon={i.Counter} />
    <NavLink uri={Paths.TenantTasksStack} text='Tasks' Icon={i.Tasks} />
    <NavLink uri={Paths.TenantPropertiesStack} text='Properties' Icon={i.Building} />
    <NavLink uri={Paths.TenantUserStack} text='Users' Icon={i.Auth} />
    <NavLink uri={Paths.TenantSettingsHome} text='Account' Icon={i.Account} />
    <NavLink uri={Paths.Support} text='Help' Icon={i.Info} />
    <NavLink uri={Paths.Logout} text='Logout' Icon={i.Logout} />
    <NavLink uri="#theme-toggle" text='Theme' Icon={i.Palette} />
  </nav>
}
