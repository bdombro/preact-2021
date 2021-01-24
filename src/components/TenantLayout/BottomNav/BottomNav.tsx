import styles from '~/components/AdminLayout/BottomNav/BottomNav.module.css'
import { h } from 'preact';
import { useLocation } from '~/lib/routing';
import { Paths } from '~/routes/router';
import { StateUpdater, useEffect, useState } from 'preact/hooks';
import { useLayoutState } from '../context';

export default function Nav() {
    const { pathname } = useLocation()
    const [isBurgerActive, setIsBurgerActive] = useState(false)

    return <nav class={styles.nav}>
        <NavLink uri={Paths.TenantStatsStack} icon='Ø' isActive={isActive(Paths.TenantStatsStack) && !isBurgerActive} />
        <NavLink uri={Paths.TenantTasksStack} icon='Ó' isActive={isActive(Paths.TenantTasksStack) && !isBurgerActive} />
        <NavLink uri={Paths.TenantPropertiesStack} icon='Ó' isActive={isActive(Paths.TenantPropertiesStack) && !isBurgerActive} />
        <NavLink uri={Paths.TenantUserStack} icon='Ö' isActive={isActive(Paths.TenantUserStack) && !isBurgerActive} />
        <NavBurger isActive={isBurgerActive} setIsActive={setIsBurgerActive} />
    </nav>

    function isActive(uri: string) {
        return pathname.startsWith(uri)
    }
}

function NavLink({ uri, icon, isActive }: { uri: string, icon: string, isActive: boolean }) {
    return (
        <a  class={`${styles.navlink} ${isActive && styles.active}`}
            href={uri + (isActive ? '?stack=reset' : '')}
        >
            <div>{icon}</div>
        </a>
    )
}

/**
 * This is a little more complex than the Marketing Navburger, b/c it can have a diff
 * state than sidebarRight b/c the sidebar can also be activated in the 
 * Header->Right->Navburger. The added complexity allows NavBurger to handle this
 * gracefully.
 */
function NavBurger({ isActive, setIsActive }: { isActive: boolean, setIsActive: StateUpdater<boolean> }) {
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