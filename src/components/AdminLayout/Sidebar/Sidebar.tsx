import styles from  './Sidebar.module.css'
import { h } from 'preact';
import lazy from '../../../lib/lazy';
import { useEffect, useState } from 'preact/hooks';

const Nav = lazy(() => import('./Nav'))


export default function Sidebar() {
    useEffect(listenForToggle, [])
    
    return <div className={styles.sidebar}>
        <Nav />
    </div>

    function listenForToggle() {
        window.addEventListener('toggle-sidebar', toggle)
        return () => window.removeEventListener('toggle-sidebar', toggle)
    }
    function toggle(e: any) {
        if (e) e.preventDefault()
        const layoutElement = document.getElementById('dashboardLayout')!
        const fullWidth = getComputedStyle(layoutElement).getPropertyValue('--sidebar-width-full')
        const miniWidth = getComputedStyle(layoutElement).getPropertyValue('--sidebar-width-mini')
        const current = getComputedStyle(layoutElement).getPropertyValue('--sidebar-width')
        layoutElement.style.setProperty(
            '--sidebar-width', 
            current === miniWidth ? fullWidth : miniWidth,
        )
    }
}
