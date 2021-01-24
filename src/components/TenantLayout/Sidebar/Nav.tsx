import styles from '~/components/MarketingLayout/SidebarRight/Nav.module.css'
import { h } from 'preact';
import { useLocation } from '~/lib/routing';
import { Paths } from '~/routes/router';

export default function Nav() {
    const { pathname } = useLocation()
    return <nav class={styles.nav}>
        <NavLink uri={Paths.TenantStatsStack} text='Stats' icon='Ø' isActive={isActive(Paths.TenantStatsStack)} />
        <NavLink uri={Paths.TenantTasksStack} text='Tasks' icon='Ó' isActive={isActive(Paths.TenantTasksStack)} />
        <NavLink uri={Paths.TenantPropertiesStack} text='Properties' icon='Ö' isActive={isActive(Paths.TenantPropertiesStack)} />
        <NavLink uri={Paths.TenantUserStack} text='Users' icon='Ö' isActive={isActive(Paths.TenantUserStack)} />
    </nav>

    function isActive(uri: string) {
        return pathname.startsWith(uri)
    }
}

function NavLink({uri, text, icon, isActive}: {uri: string, text: string, icon: string, isActive: boolean}) {
    return (
        <a 
            href={uri + (isActive ? '?stack=reset' : '')}
            class={`${styles.navlink} ${isActive && styles.active}`}
        >
            <div class={styles.navlinkIcon}>{icon}</div>
            <div class={styles.navlinkText}>{text}</div>
        </a>
    )
}