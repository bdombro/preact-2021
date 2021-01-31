import { h } from 'preact'

import lazy from '~/layout/lazy'
import styles from '~/layout/MarketingLayout/Header/Left/Left.module.css'

const Burger = lazy(() => import('./Burger'))
const Logo = lazy(() => import('./Logo'))
const Search = lazy(() => import('./SearchBar'))

export default function Left() {
  return <div class={styles.left}>
    <Burger />
    <Logo />
    <Search />
  </div>
}
