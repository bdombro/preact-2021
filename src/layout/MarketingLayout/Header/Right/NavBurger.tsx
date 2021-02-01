import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { SidebarRightCtx } from '~/App.context'

import styles from './NavBurger.module.css'
import linkStyles from './NavLink.module.css'

const useSidebarRight = SidebarRightCtx.use

/**
 * This is a little complex b/c it can have a diff state than sidebarRight b/c the sidebar can
 * also be activated in BottomNav components. The added complexity allows NavBurger to handle 
 * this gracefully.
 */
export default function NavBurger() {
  const [isLinkActive, setIsLinkActive] = useState(false)
  const [isSidebarActive, setIsSidebarActive] = useSidebarRight()
  useEffect(() => {
    if (!isSidebarActive) setIsLinkActive(false)
  }, [isSidebarActive])
  return (
    <a class={`${linkStyles.navlink} ${styles.hamburger} ${isLinkActive ? linkStyles.active : ''}`}
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