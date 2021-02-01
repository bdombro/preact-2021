import { h } from 'preact'

import NavLink from '~/layout/components/SidebarNavLink'

import styles from './Sidebar.module.css'

interface NavLinkProps { uri: string, text: string, Icon: any }
type NavLinks = NavLinkProps[]

export default function Sidebar({ navLinks }: { navLinks: NavLinks }) {
  return (
    <div class={`${styles.sidebar}`}>
      <nav class={styles.nav}>
        {navLinks.map(nl => <NavLink {...nl} />)}
      </nav>
    </div>
  )
}
