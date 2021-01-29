import { h } from 'preact'

import styles from  './Burger.module.css'

export default function Burger() {
  return <a class={styles.burger} href="#toggle-sidebar">Ξ</a>
}