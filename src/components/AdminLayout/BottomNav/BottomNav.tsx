import styles from './BottomNav.module.css'
import { h } from 'preact';
import { useLocation } from '~/lib/routing';
import { Paths } from '~/routes/router';
import { useEffect, useState } from 'preact/hooks';
import { useLayoutState } from '../context';
import * as i from '~/components/Icons'

export default function Nav() {
    return <nav class={styles.nav}>
        <NavLink uri={Paths.AdminStatsStack} Icon={i.Counter} />
        <NavLink uri={Paths.AdminUserStack} Icon={i.Auth} />
        <NavLink uri={Paths.AdminBlogStack} Icon={i.Post} />
        <NavBurger />
    </nav>
}

function NavLink({ uri, Icon }: { uri: string, Icon: any }) {
    const location = useLocation()
    const [isSidebarActive] = useLayoutState().sidebarRight
    const isActive = location.pathname.startsWith(uri)
    return (
        <a  class={`${styles.navlink} ${isActive && !isSidebarActive && styles.active}`}
            href={uri + (isActive ? '?stack=reset' : '')}
        >
            <div><Icon /></div>
        </a>
    )
}

/**
 * This is a little more complex than the Marketing Navburger, b/c it can have a diff
 * state than sidebarRight b/c the sidebar can also be activated in the 
 * Header->Right->Navburger. The added complexity allows NavBurger to handle this
 * gracefully.
 */
function NavBurger() {
    const [isActive, setIsActive] = useState(false)
    const [isSidebarActive, setIsSidebarActive] = useLayoutState().sidebarRight
    useEffect(() => {
        if (!isSidebarActive) setIsActive(false)
    }, [isSidebarActive])
    return (
        <a class={`${styles.navlink} ${isActive && styles.active}`}
           href="#toggle-sidebar-right"
            onClick={() => {
                setIsActive(isActive => {
                    setIsSidebarActive(!isActive)
                    return !isActive
                })
            }}
        >
            <div>{isActive ? "X" : "Ξ"}</div>
        </a>
    )
}