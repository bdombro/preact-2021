import { Fragment as F, h } from 'preact'

import lazy from '~/layout/lazy'
import useMedia from '~/layout/useMedia'
import { Paths } from '~/routes/router'

import styles from './Right.module.css'

const NavLink = lazy(() => import('./NavLink'))
const NavBurger = lazy(() => import('./NavBurger'))

export default function Right() {
  const isWide = useMedia('(min-width: 600px)')
  return <div class={styles.right}>
    {isWide && <F>
      <NavLink uri={Paths.Blog} text='Blog' />
      <NavLink uri={Paths.Login} text='Login' />
    </F>}
    <NavBurger />
  </div>
}
