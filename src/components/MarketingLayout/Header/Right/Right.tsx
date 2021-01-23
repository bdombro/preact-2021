import styles from './Right.module.css'
import { h } from 'preact';
import { useLocation } from '~/lib/routing';
import { Paths } from '~/routes/router';
import { useState } from 'preact/hooks';

export default function Nav() {
    const { pathname } = useLocation()
    return <nav class={styles.nav}>
        <NavLink uri={Paths.Blog} text='Blog' isActive={isActive(Paths.Blog)} />
        <NavLink uri={Paths.Login} text='Login' isActive={isActive(Paths.Login)} />
        <NavLinkMenu />
    </nav>

    function isActive(uri: string) {
        return pathname.startsWith(uri)
    }
}

function NavLink({ uri, text, isActive }: { uri: string, text: string, isActive: boolean }) {
    return (
        <a class={`${styles.navlink} ${isActive && styles.active}`}
            href={uri + (isActive ? '?stack=reset' : '')}
        >
            <div>{text}</div>
        </a>
    )
}

function NavLinkMenu() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <a class={`${styles.navlink} ${isOpen && styles.active}`}
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