import { h } from 'preact'

import styles from  './Logo.module.css'

export default function HeaderLogo() {
  return <a class={styles.logo} href='/'>Stacks!</a>
}