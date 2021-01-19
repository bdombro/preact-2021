import styles from './BottomNav.module.css'
import { h } from 'preact';

export default function Nav() {
    const { pathname } = location
    return <nav className={styles.nav}>
        <NavLink uri='/about' text='Ø' isActive={isActive('/about')} />
        <NavLink uri='/auth' text='Ó' isActive={isActive('/auth')} />
        <NavLink uri='/blog' text='Ö' isActive={isActive('/blog')} />
    </nav>

    function isActive(uri: string) {
        return pathname.startsWith(uri)
    }
}

function NavLink({ uri, text, isActive }: { uri: string, text: string, isActive: boolean }) {
    return (
        <a
            href={uri + (isActive ? '?stack=reset' : '')}
            className={`${styles.navlink} ${isActive && styles.active}`}
        >
            <div>{text}</div>
        </a>
    )
}