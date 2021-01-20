import styles from  './Nav.module.css'
import { h } from 'preact';
import { useLocation } from '~/components/routing';
import { Paths } from '~/routes/router';

export default function Nav() {
    const { pathname } = useLocation()
    return <nav className={styles.nav}>
        <NavLink uri={Paths.About} text='About' icon='Ø' isActive={isActive(Paths.About)} />
        <NavLink uri={Paths.AuthStack} text='Auth' icon='Ó' isActive={isActive(Paths.AuthStack)} />
        <NavLink uri={Paths.BlogStack} text='Blog' icon='Ö' isActive={isActive(Paths.BlogStack)} />
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