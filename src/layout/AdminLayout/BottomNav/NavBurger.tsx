import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { SidebarRightCtx } from '~/App.context'

import styles from './NavLink.module.css'

const useSidebarRight = SidebarRightCtx.use

/**
 * This is a little more complex than the Marketing Navburger, b/c it can have a diff
 * state than sidebarRight b/c the sidebar can also be activated in the 
 * Header->Right->Navburger. The added complexity allows NavBurger to handle this
 * gracefully.
 */
export default function NavBurger() {
  const [isActive, setIsActive] = useState(false)
  const [isSidebarActive, setIsSidebarActive] = useSidebarRight()
  useEffect(() => {
    if (!isSidebarActive) setIsActive(false)
  }, [isSidebarActive])
  return (
    <a class={`${styles.navlink} ${isActive && styles.active}`}
      href="#sidebar-right-toggle"
      onClick={() => {
        setIsActive(isActive => {
          setIsSidebarActive(!isActive)
          return !isActive
        })
      }}
    >
      <div>{isActive ? 'X' : 'Ξ'}</div>
    </a>
  )
}