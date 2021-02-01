import { h } from 'preact'

import { SidebarRightCtx } from '~/App.context'
import lazy from '~/layout/lazy'
import styles from '~/layout/MarketingLayout/SidebarRight/SidebarRight.module.css'

const Nav = lazy(() => import('./Nav'))

const useSidebarRight = SidebarRightCtx.use

export default function SidebarRight() {
  const [isActive] = useSidebarRight()
  return isActive && <div class={`${styles.sidebar}`}><Nav /></div>
}
