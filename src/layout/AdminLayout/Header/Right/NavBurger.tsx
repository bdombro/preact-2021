import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import styles from '~/layout/MarketingLayout/Header/Right/NavBurger.module.css'
import linkStyles from '~/layout/MarketingLayout/Header/Right/NavLink.module.css'

import { useSidebarState } from '../../SidebarRight/SidebarRight'

/**
 * This is a little more complex than the Marketing Navburger, b/c it can have a diff
 * state than sidebarRight b/c the sidebar can also be activated in BottomNav. The 
 * added complexity allows NavBurger to handle this gracefully.
 */
export default function NavBurger() {
  const [isLinkActive, setIsLinkActive] = useState(false)
  const [isSidebarActive, setIsSidebarActive] = useSidebarState()
  useEffect(() => {
    if (!isSidebarActive) setIsLinkActive(false)
  }, [isSidebarActive])
  return (
    <a class={`${linkStyles.navlink} ${styles.hamburger} ${isLinkActive ? linkStyles.active: ''}`}
      href={'#navburger-click'}
      onClick={() => {
        setIsLinkActive(isActive => {
          setIsSidebarActive(!isActive)
          return !isActive
        })
      }}
    >
      {isLinkActive ? 'X' : 'Ξ'}
    </a>
  )
}