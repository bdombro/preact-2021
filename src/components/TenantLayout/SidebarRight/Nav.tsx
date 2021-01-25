import styles from '~/components/MarketingLayout/SidebarRight/Nav.module.css'
import { h } from 'preact';
import { useLocation } from '~/lib/routing';
import { Paths } from '~/routes/router';
import lazy from '~/lib/lazy';

const StatsIcon = lazy(() => import('~/components/icons/CounterIcon'))
const TasksIcon = lazy(() => import('~/components/icons/OrderBoolAscendingVariantIcon'))
const PropertiesIcon = lazy(() => import('~/components/icons/OfficeBuildingMarkerOutlineIcon'))
const UsersIcon = lazy(() => import('~/components/icons/ShieldAccountOutlineIcon'))
const AccountIcon = lazy(() => import('~/components/icons/CardAccountDetailsOutlineIcon'))
const HelpIcon = lazy(() => import('~/components/icons/InformationOutlineIcon'))
const LogoutIcon = lazy(() => import('~/components/icons/LogoutVariantIcon'))
const ThemeIcon = lazy(() => import('~/components/icons/PaletteOutlineIcon'))

export default function Nav() {
    const { pathname } = useLocation()
    return <nav class={styles.nav}>
        <NavLink uri={Paths.AdminStatsStack} text='Stats' Icon={StatsIcon} isActive={isActive(Paths.AdminStatsStack)} />
        <NavLink uri={Paths.TenantTasksStack} text='Tasks' Icon={TasksIcon} isActive={isActive(Paths.TenantTasksStack)} />
        <NavLink uri={Paths.TenantPropertiesStack} text='Properties' Icon={PropertiesIcon} isActive={isActive(Paths.TenantPropertiesStack)} />
        <NavLink uri={Paths.TenantUserStack} text='Users' Icon={UsersIcon} isActive={isActive(Paths.TenantUserStack)} />
        <NavLink uri={Paths.TenantSettingsHome} text='Account' Icon={AccountIcon} isActive={isActive(Paths.TenantSettingsHome)} />
        <NavLink uri={Paths.Support} text='Help' Icon={HelpIcon} isActive={false} />
        <NavLink uri={Paths.Logout} text='Logout' Icon={LogoutIcon} isActive={false} />
        <NavLink uri="#theme-toggle" text='Theme' Icon={ThemeIcon} isActive={false} />
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