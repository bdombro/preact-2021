import styles from './MobileHeader.module.css'
import { h } from 'preact';
import lazy from '../../lazy';

const Left = lazy(() => import('./Left'))
const Right = lazy(() => import('./Right'))

export default function MobileHeader() {
    return <div className={styles.header}>
        <Left />
        <Right />
    </div>
}