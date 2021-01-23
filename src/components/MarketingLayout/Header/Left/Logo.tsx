import styles from  './Logo.module.css'
import { h } from 'preact';

export default function HeaderLogo() {
    return <a class={styles.logo} href='/'>
        <img src='/logo192.png' />
        <div>Stacks!</div>
    </a>
}