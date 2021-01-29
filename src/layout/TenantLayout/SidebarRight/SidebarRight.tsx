import { h } from 'preact'

import lazy from '~/layout/lazy'
import styles from '~/layout/MarketingLayout/SidebarRight/SidebarRight.module.css'
import useGlobalState from '~/layout/useGlobalState'

const Nav = lazy(() => import('./Nav'))

export const useSidebarState = useGlobalState('tenantLayoutSidebarRight', false)

export default function SidebarRight() {
  const [isActive] = useSidebarState()
  return isActive && <div class={`${styles.sidebar}`}><Nav /></div>
}