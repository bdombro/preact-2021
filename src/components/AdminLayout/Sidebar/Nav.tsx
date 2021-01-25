import styles from '~/components/MarketingLayout/SidebarRight/Nav.module.css'
import { h } from 'preact';
import { useLocation } from '~/lib/routing';
import { Paths } from '~/routes/router';
import lazy from '~/lib/lazy';

const StatsIcon = lazy(() => import('~/components/icons/CounterIcon'))
const AuthIcon = lazy(() => import('~/components/icons/ShieldAccountOutlineIcon'))
const BlogIcon = lazy(() => import('~/components/icons/PostOutlineIcon'))

export default function Nav() {
    const { pathname } = useLocation()
    return <nav class={styles.nav}>
        <NavLink uri={Paths.AdminStatsStack} text='Stats' Icon={StatsIcon} isActive={isActive(Paths.AdminStatsStack)} />
        <NavLink uri={Paths.AdminBlogStack} text='Auth' Icon={AuthIcon} isActive={isActive(Paths.AdminBlogStack)} />
        <NavLink uri={Paths.AdminUserStack} text='Blog' Icon={BlogIcon} isActive={isActive(Paths.AdminUserStack)} />
    </nav>

    function isActive(uri: string) {
        return pathname.startsWith(uri)
    }
}


function NavLink({uri, text, Icon, isActive}: {uri: string, text: string, Icon: any, isActive: boolean}) {
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