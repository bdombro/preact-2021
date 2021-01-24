import styles from './SidebarRight.module.css'
import { h } from 'preact';
import lazy from '~/lib/lazy';
import { useLayoutState } from '../context';

const Nav = lazy(() => import('./Nav'))

export default function SidebarRight() {
    const [isActive] = useLayoutState().sidebarRight
    return <div class={`${styles.sidebar} ${isActive && styles.active}`}>
        <Nav />
    </div>
}