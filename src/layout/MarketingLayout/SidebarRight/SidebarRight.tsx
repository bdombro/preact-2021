import { h } from 'preact'

import lazy from '~/layout/lazy'

import { useLayoutState } from '../context'
import styles from './SidebarRight.module.css'

const Nav = lazy(() => import('./Nav'))

export default function SidebarRight() {
  const [isActive] = useLayoutState().sidebarRight
  return isActive && <div class={`${styles.sidebar}`}><Nav /></div>
}