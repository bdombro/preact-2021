import styles from  './Logo.module.css'
import { h } from 'preact';
import lazy from '~/lib/lazy';
// import logo from '~/logo.png'

const Logo = lazy(() => import('~/components/icons/ReactIcon'))

export default function HeaderLogo() {
    return <a class={styles.logo} href='/'>
        <Logo />
        <div>Stacks!</div>
    </a>
}