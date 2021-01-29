import { h } from 'preact'

import styles from '~/layout/AdminLayout/Sidebar/Sidebar.module.css'
import lazy from '~/layout/lazy'

const Nav = lazy(() => import('./Nav'))


export default function Sidebar() {
  return <div class={styles.sidebar}>
    <Nav />
  </div>
}