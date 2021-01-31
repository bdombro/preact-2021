import { h } from 'preact'

import * as i from '~/layout/icons'
import { useLocation } from '~/layout/routing'
import { Paths } from '~/routes/routes'

import styles from './Nav.module.css'

export default function Nav() {
  const { pathname } = useLocation()
  return <nav class={styles.nav}>
    <NavLink uri={Paths.Home} text='Home' Icon={i.Home} isActive={pathname === Paths.Home} />
    <NavLink uri={Paths.About} text='About' Icon={i.Info} isActive={isActive(Paths.About)} />
    <NavLink uri={Paths.Blog} text='Blog' Icon={i.Post} isActive={isActive(Paths.Blog)} />
    <NavLink uri={Paths.Login} text='Login' Icon={i.Login} isActive={isActive(Paths.Login)} />
    <NavLink uri="#theme-toggle" text='Theme' Icon={i.Palette} isActive={false} />
  </nav>

  function isActive(uri: string) {
    return pathname.startsWith(uri)
  }
}

function NavLink({ uri, text, Icon, isActive }: { uri: string, text: string, Icon: any, isActive: boolean }) {
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