import styles from  './Logo.module.css'
import { h } from 'preact';

export default function HeaderLogo() {
    return <a className={styles.logo} href='/'>Stacks!</a>
}