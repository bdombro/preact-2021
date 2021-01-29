import styles from '~/layout/MarketingLayout/Header/Header.module.css'
import { h } from 'preact';
import lazy from '~/layout/lazy';

const Left = lazy(() => import('./Left/Left'))
const Right = lazy(() => import('./Right/Right'))

export default function Header() {
    return <div class={styles.header}>
        <Left />
        <Right />
    </div>
}