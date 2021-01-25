import styles from  './Logo.module.css'
import { h } from 'preact';
import logo from '~/logo.png'

export default function HeaderLogo() {
    return <a class={styles.logo} href='/'>
        <img src={logo} />
        <div>Stacks!</div>
    </a>
}