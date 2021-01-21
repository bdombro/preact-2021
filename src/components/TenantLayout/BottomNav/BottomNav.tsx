import styles from '~/components/AdminLayout/BottomNav/BottomNav.module.css'
import { h } from 'preact';
import { useLocation } from '~/lib/routing';
import { Paths } from '~/routes/router';
import { useState } from 'preact/hooks';

export default function Nav() {
    const { pathname } = useLocation()
    const [isMenuOpen, setMenuIsOpen] = useState(false)

    return <nav className={styles.nav}>
        <NavLink uri={Paths.TenantStatsStack} icon='Ø' isActive={isActive(Paths.TenantStatsStack) && !isMenuOpen} />
        <NavLink uri={Paths.TenantTasksStack} icon='Ó' isActive={isActive(Paths.TenantTasksStack) && !isMenuOpen} />
        <NavLink uri={Paths.TenantPropertiesStack} icon='Ó' isActive={isActive(Paths.TenantPropertiesStack) && !isMenuOpen} />
        <NavLink uri={Paths.TenantUserStack} icon='Ö' isActive={isActive(Paths.TenantUserStack) && !isMenuOpen} />
        <NavLinkMenu isOpen={isMenuOpen} setIsOpen={setMenuIsOpen} />
    </nav>

    function isActive(uri: string) {
        return pathname.startsWith(uri)
    }
}

function NavLink({ uri, icon, isActive }: { uri: string, icon: string, isActive: boolean }) {
    return (
        <a  className={`${styles.navlink} ${isActive && styles.active}`}
            href={uri + (isActive ? '?stack=reset' : '')}
        >
            <div>{icon}</div>
        </a>
    )
}

type SetIsOpenCallback = (prev: boolean) => boolean
function NavLinkMenu({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (prev: SetIsOpenCallback) => any}) {
    return (
        <a className={`${styles.navlink} ${isOpen && styles.active}`}
           href="#open-sidebar"
           onClick={onClick}
        >
            <div>{isOpen ? "X" : "Ξ"}</div>
        </a>
    )

    function onClick(e: any) {
        e.preventDefault()
        window.dispatchEvent(new Event('toggle-sidebar-right'))
        setIsOpen(isOpen => !isOpen)
    }
}