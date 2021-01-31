import { h } from 'preact'

import * as i from '~/layout/icons'
import { Paths } from '~/routes/routes'

import styles from './Nav.module.css'
import NavLink from './NavLink'

export default function Nav() {
  return <nav class={styles.nav}>
    <NavLink uri={Paths.Blog} text='Blog' Icon={i.Post} />
    <NavLink uri={Paths.Home} text='Home' Icon={i.Home} />
    <NavLink uri={Paths.About} text='About' Icon={i.Info} />
    <NavLink uri={Paths.Support} text='Support' Icon={i.Info} />
    <NavLink uri={Paths.Login} text='Login' Icon={i.Login} />
    <NavLink uri="#theme-toggle" text='Theme' Icon={i.Palette} />
  </nav>
}