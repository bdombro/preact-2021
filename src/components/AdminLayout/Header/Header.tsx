import styles from '~/components/MarketingLayout/Header/Header.module.css'
import { h } from 'preact';
import lazy from '~/lib/lazy';

const Left = lazy(() => import('./Left/Left'))
const Right = lazy(() => import('./Right/Right'))

export default function Header() {
    return <div class={styles.header}>
        <Left />
        <Right />
    </div>
}