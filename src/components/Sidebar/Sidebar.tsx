import styles from  './Sidebar.module.css'
import { h } from 'preact';
import lazy from '../lazy';
import { useEffect, useState } from 'preact/hooks';

const Nav = lazy(() => import('./Nav'))

const fullWidth = getComputedStyle(document.documentElement).getPropertyValue('--sidebar-width-full')
const miniWidth = getComputedStyle(document.documentElement).getPropertyValue('--sidebar-width-mini')

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
        const current = getComputedStyle(document.documentElement).getPropertyValue('--sidebar-width')
        document.documentElement.style.setProperty(
            '--sidebar-width', 
            current === miniWidth ? fullWidth : miniWidth,
        )
    }
}
