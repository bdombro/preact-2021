import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { SidebarRightCtx } from '~/App.context'
import styles from '~/layout/AdminLayout/BottomNav/BottomNav.module.css'
import NavBurger from '~/layout/AdminLayout/BottomNav/NavBurger'
import NavLink from '~/layout/AdminLayout/BottomNav/NavLink'
import * as i from '~/layout/icons'
import { Paths } from '~/routes/routes'

export default function Nav() {
  return <nav class={styles.nav}>
    <NavLink uri={Paths.TenantStatsStack} Icon={i.Counter} />
    <NavLink uri={Paths.TenantTasksStack} Icon={i.Tasks} />
    <NavLink uri={Paths.TenantPropertiesStack} Icon={i.Building} />
    <NavLink uri={Paths.TenantUserStack} Icon={i.Auth} />
    <NavBurger />
  </nav>
}
