import { h } from 'preact'

import lazy from '~/layout/lazy'
import useGlobalState from '~/layout/useGlobalState'

import styles from './SidebarRight.module.css'

const Nav = lazy(() => import('./Nav'))

export const useSidebarState = useGlobalState('marketingLayoutSidebarRight', false)

export default function SidebarRight() {
  const [isActive] = useSidebarState()
  return isActive && <div class={`${styles.sidebar}`}><Nav /></div>
}