import styles from '~/components/MarketingLayout/SidebarRight/Nav.module.css'
import { h } from 'preact';
import { useLocation } from '~/lib/routing';
import { Paths } from '~/routes/router';

export default function Nav() {
    const { pathname } = useLocation()
    return <nav class={styles.nav}>
        <NavLink uri={Paths.AdminStatsStack} text='Stats' icon='Ø' isActive={isActive(Paths.AdminStatsStack)} />
        <NavLink uri={Paths.AdminBlogStack} text='Auth' icon='Ó' isActive={isActive(Paths.AdminBlogStack)} />
        <NavLink uri={Paths.AdminUserStack} text='Blog' icon='Ö' isActive={isActive(Paths.AdminUserStack)} />
        <NavLink uri={Paths.AdminSettingsHome} text='Account' icon='Ö' isActive={isActive('Paths.AdminSettingsHome')} />
        <NavLink uri={Paths.Support} text='Help' icon='Ö' isActive={false} />
        <NavLink uri={Paths.Logout} text='Logout' icon='Ö' isActive={false} />
        <NavLink uri="#theme-toggle" text='Theme' icon='Ö' isActive={false} />
    </nav>

    function isActive(uri: string) {
        return pathname.startsWith(uri)
    }
}

function NavLink({ uri, text, icon, isActive }: { uri: string, text: string, icon: string, isActive: boolean }) {
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