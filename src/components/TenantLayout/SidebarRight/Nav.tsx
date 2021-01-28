import styles from '~/components/MarketingLayout/SidebarRight/Nav.module.css'
import { h } from 'preact';
import { useLocation } from '~/lib/routing';
import { Paths } from '~/routes/router';
import * as i from '~/components/icons'

export default function Nav() {
    const { pathname } = useLocation()
    return <nav class={styles.nav}>
        <NavLink uri={Paths.AdminStatsStack} text='Stats' Icon={i.Counter} isActive={isActive(Paths.AdminStatsStack)} />
        <NavLink uri={Paths.TenantTasksStack} text='Tasks' Icon={i.Tasks} isActive={isActive(Paths.TenantTasksStack)} />
        <NavLink uri={Paths.TenantPropertiesStack} text='Properties' Icon={i.Building} isActive={isActive(Paths.TenantPropertiesStack)} />
        <NavLink uri={Paths.TenantUserStack} text='Users' Icon={i.Auth} isActive={isActive(Paths.TenantUserStack)} />
        <NavLink uri={Paths.TenantSettingsHome} text='Account' Icon={i.Account} isActive={isActive(Paths.TenantSettingsHome)} />
        <NavLink uri={Paths.Support} text='Help' Icon={i.Info} isActive={false} />
        <NavLink uri={Paths.Logout} text='Logout' Icon={i.Logout} isActive={false} />
        <NavLink uri="#theme-toggle" text='Theme' Icon={i.Palette} isActive={false} />
    </nav>

    function isActive(uri: string) {
        return pathname.startsWith(uri)
    }
}


function NavLink({ uri, text, Icon, isActive }: { uri: string, text: string, Icon: any, isActive: boolean }) {
    return (
        <a
            href={uri + (isActive ? '?stack=reset' : '')}
            class={`${styles.navlink} ${isActive && styles.active}`}
        >
            <div class={styles.navlinkIcon}><Icon /></div>
            <div class={styles.navlinkText}>{text}</div>
        </a>
    )
}