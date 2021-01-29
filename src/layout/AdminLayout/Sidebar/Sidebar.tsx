import { h } from 'preact'

import lazy from '~/layout/lazy'

import styles from  './Sidebar.module.css'

const Nav = lazy(() => import('./Nav'))

export default function Sidebar() {
  return <div class={styles.sidebar}>
    <Nav />
  </div>
}
