import { h } from 'preact'

import * as i from '~/layout/icons'
import { Paths } from '~/routes/routes'

import styles from './BottomNav.module.css'
import NavBurger from './NavBurger'
import NavLink from './NavLink'

export default function Nav() {
  return <nav class={styles.nav}>
    <NavLink uri={Paths.AdminStatsStack} Icon={i.Counter} />
    <NavLink uri={Paths.AdminUserStack} Icon={i.Auth} />
    <NavLink uri={Paths.AdminBlogStack} Icon={i.Post} />
    <NavBurger />
  </nav>
}
