import { h } from 'preact';
import { Paths } from '~/routes/router';
import styles from '~/layout/MarketingLayout/Header/Right/Right.module.css'
import lazy from '~/layout/lazy';
import useMedia from '~/layout/useMedia';

const NavLink = lazy(() => import('./NavLink'))
const NavBurger = lazy(() => import('./NavBurger'))

export default function Nav() {
    const isWide = useMedia('(min-width: 600px)')
    return <nav class={styles.right}>
        {isWide && <NavLink uri={Paths.Support} text='Need Help?' />}
        <NavBurger />
    </nav>
}