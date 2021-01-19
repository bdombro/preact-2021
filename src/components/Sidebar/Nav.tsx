import styles from  './Nav.module.css'
import { h } from 'preact';
import {useLocation} from "../routing"

export default function Nav() {
    const { pathname } = useLocation()
    return <nav className={styles.nav}>
        <NavLink uri='/about' text='About' icon='Ø' isActive={isActive('/about')} />
        <NavLink uri='/auth' text='Auth' icon='Ö' isActive={isActive('/auth')} />
        <NavLink uri='/blog' text='Blog' icon='Ó' isActive={isActive('/blog')} />
    </nav>

    function isActive(uri: string) {
        return pathname.startsWith(uri)
    }
}

function NavLink({uri, text, icon, isActive}: {uri: string, text: string, icon: string, isActive: boolean}) {
    return (
        <a 
            href={uri + (isActive ? '?stack=reset' : '')}
            className={`${styles.navlink} ${isActive && styles.active}`}
        >
            <div className={styles.navlinkIcon}>{icon}</div>
            <div className={styles.navlinkText}>{text}</div>
        </a>
    )
}