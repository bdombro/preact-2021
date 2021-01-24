import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import lazy from '~/lib/lazy';
import styles from '~/components/MarketingLayout/SidebarRight/SidebarRight.module.css'
import { useLayoutState } from '../context';

const Nav = lazy(() => import('./Nav'))

export default function SidebarRight() {
    const [isActive] = useLayoutState().sidebarRight
    return <div class={`${styles.sidebar} ${isActive && styles.active}`}>
        <Nav />
    </div>
}