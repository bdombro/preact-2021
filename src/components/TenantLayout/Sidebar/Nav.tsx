import styles from '~/components/MarketingLayout/SidebarRight/Nav.module.css'
import { h } from 'preact';
import { useLocation } from '~/lib/routing';
import { Paths } from '~/routes/router';
import lazy from '~/lib/lazy';

const StatsIcon = lazy(() => import('~/components/icons/CounterIcon'))
const TasksIcon = lazy(() => import('~/components/icons/OrderBoolAscendingVariantIcon'))
const PropertiesIcon = lazy(() => import('~/components/icons/OfficeBuildingMarkerOutlineIcon'))
const UsersIcon = lazy(() => import('~/components/icons/ShieldAccountOutlineIcon'))

export default function Nav() {
    const { pathname } = useLocation()
    return <nav class={styles.nav}>
        <NavLink uri={Paths.TenantStatsStack} text='Stats' Icon={StatsIcon} isActive={isActive(Paths.TenantStatsStack)} />
        <NavLink uri={Paths.TenantTasksStack} text='Tasks' Icon={TasksIcon} isActive={isActive(Paths.TenantTasksStack)} />
        <NavLink uri={Paths.TenantPropertiesStack} text='Properties' Icon={PropertiesIcon} isActive={isActive(Paths.TenantPropertiesStack)} />
        <NavLink uri={Paths.TenantUserStack} text='Users' Icon={UsersIcon} isActive={isActive(Paths.TenantUserStack)} />
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