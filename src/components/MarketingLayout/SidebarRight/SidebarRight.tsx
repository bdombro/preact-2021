import styles from './SidebarRight.module.css'
import { h } from 'preact';
import lazy from '../../../lib/lazy';
import { useEffect, useState } from 'preact/hooks';

const Nav = lazy(() => import('./Nav'))

export default function SidebarRight() {
    const [isActive, setIsActive] = useState(false)
    useEffect(listenForToggle, [])

    return <div class={`${styles.sidebar} ${isActive && styles.active}`}>
        <Nav />
    </div>

    function listenForToggle() {
        window.addEventListener('toggle-sidebar-right', toggle)
        return () => window.removeEventListener('toggle-sidebar-right', toggle)
    }
    function toggle() {
        setIsActive(isActive => !isActive)
    }
}