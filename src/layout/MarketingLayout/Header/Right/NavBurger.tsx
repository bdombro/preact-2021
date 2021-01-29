import { h } from 'preact'

import { useSidebarState } from '../../SidebarRight/SidebarRight'
import styles from './NavBurger.module.css'
import linkStyles from './NavLink.module.css'

export default function NavBurger() {
  const [isActive, setIsActive] = useSidebarState()
  return (
    <a class={`${linkStyles.navlink} ${styles.hamburger} ${isActive ? linkStyles.active : ''}`}
      href={'#navburger-click'}
      onClick={() => setIsActive(!isActive)}
    >
      {isActive ? 'X' : 'Ξ'}
    </a>
  )
}