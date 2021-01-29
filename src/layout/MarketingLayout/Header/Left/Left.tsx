import { h } from 'preact'

import lazy from '~/layout/lazy'

import styles from './Left.module.css'

const Logo = lazy(() => import('./Logo'))

export default function Left() {
  return <div class={styles.left}>
    <Logo />
  </div>
}
