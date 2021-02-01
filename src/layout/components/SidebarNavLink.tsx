import { h } from 'preact'

import { useLocation } from '~/lib/router'

import styles from './SidebarNavLink.module.css'

interface NavLinkProps { uri: string, text: string, Icon: any }

export default function NavLink({ uri, text, Icon }: NavLinkProps) {
  const pathname = useLocation().pathname
  const isActive = uri === '/' ? pathname === '/' : pathname.startsWith(uri)
  return (
    <a
      href={uri + (isActive ? '?stack=reset' : '')}
      class={`${styles.navlink} ${isActive && styles.active}`}
    >
      <div class={styles.navlinkIcon}><Icon /></div>
      <div class={styles.navlinkText}>{text}</div>
    </a>
  )
}