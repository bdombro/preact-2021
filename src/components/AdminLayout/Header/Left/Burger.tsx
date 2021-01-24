import styles from  './Burger.module.css'
import { h } from 'preact';

export default function Burger() {
    return <a class={styles.burger} href="#toggle-sidebar">Ξ</a>
}