import styles from './DesktopHeader.module.css'
import { h } from 'preact';
import lazy from '../lazy';

const Left = lazy(() => import('./Left'))
const Right = lazy(() => import('./Right'))

export default function DesktopHeader() {
    return <div className={styles.header}>
        <Left />
        <Right />
    </div>
}