import { h } from 'preact'

import useLocation from '~/layout/routing/useLocation'

import styles from './NavLink.module.css'


export default function NavLink({ uri, text, Icon }: { uri: string, text: string, Icon: any }) {
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