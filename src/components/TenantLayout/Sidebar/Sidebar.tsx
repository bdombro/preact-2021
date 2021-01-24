import styles from '~/components/AdminLayout/Sidebar/Sidebar.module.css'
import { h } from 'preact';
import lazy from '~/lib/lazy';
import { useEffect } from 'preact/hooks';

const Nav = lazy(() => import('./Nav'))


export default function Sidebar() {
    useEffect(listenForToggle, [])
    
    return <div class={styles.sidebar}>
        <Nav />
    </div>

    function listenForToggle() {
        const event = '#toggle-sidebar'
        window.addEventListener(event, toggle)
        return () => window.removeEventListener(event, toggle)
    }
    function toggle(e: any) {
        if (e) e.preventDefault()
        const layoutElement = document.getElementById('layout')!
        const fullWidth = getComputedStyle(layoutElement).getPropertyValue('--sidebar-width-full')
        const miniWidth = getComputedStyle(layoutElement).getPropertyValue('--sidebar-width-mini')
        const current = getComputedStyle(layoutElement).getPropertyValue('--sidebar-width')
        layoutElement.style.setProperty(
            '--sidebar-width', 
            current === miniWidth ? fullWidth : miniWidth,
        )
    }
}
