import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { SidebarRightCtx } from '~/App.context'
import styles from '~/layout/MarketingLayout/Header/Right/NavBurger.module.css'
import linkStyles from '~/layout/MarketingLayout/Header/Right/NavLink.module.css'

/**
 * This is a little more complex than the Marketing Navburger, b/c it can have a diff
 * state than sidebarRight b/c the sidebar can also be activated in BottomNav. The 
 * added complexity allows NavBurger to handle this gracefully.
 */
export default function NavBurger() {
  const [isActive, setIsActive] = useState(false)
  const [isSidebarActive, setIsSidebarActive] = SidebarRightCtx.use()
  useEffect(() => {
    if (!isSidebarActive) setIsActive(false)
  }, [isSidebarActive])
  return (
    <a class={`${linkStyles.navlink} ${styles.hamburger} ${isActive ? linkStyles.active: ''}`}
      href={'#navburger-click'}
      onClick={() => {
        setIsActive(isActive => {
          setIsSidebarActive(!isActive)
          return !isActive
        })
      }}
    >
      {isActive ? 'X' : 'Ξ'}
    </a>
  )
}