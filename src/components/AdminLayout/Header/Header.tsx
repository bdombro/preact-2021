import styles from './Header.module.css'
import { h } from 'preact';
import lazy from '~/lib/lazy';

const Left = lazy(() => import('./Left'))
const Right = lazy(() => import('./Right'))

export default function Header() {
    return <div className={styles.header}>
        <Left />
        <Right />
    </div>
}