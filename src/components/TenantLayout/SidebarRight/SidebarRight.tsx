import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import lazy from '~/lib/lazy';
import styles from '~/components/MarketingLayout/SidebarRight/SidebarRight.module.css'
import { useLayoutState } from '../context';

const Nav = lazy(() => import('./Nav'))

export default function SidebarRight() {
    const [isActive] = useLayoutState().sidebarRight
    return isActive && <div class={`${styles.sidebar}`}><Nav /></div>
}