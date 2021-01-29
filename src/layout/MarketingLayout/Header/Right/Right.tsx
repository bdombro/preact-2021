import styles from './Right.module.css'
import { Fragment as F, h } from 'preact'
import { Paths } from '~/routes/router'
import lazy from '~/layout/lazy';
import useMedia from '~/layout/useMedia';

const NavLink = lazy(() => import('./NavLink'))
const NavBurger = lazy(() => import('./NavBurger'))

export default function Right() {
    const isWide = useMedia('(min-width: 600px)')
    return <div class={styles.right}>
        {isWide && <F>
            {/* @ts-ignore */}
            <NavLink uri={Paths.Blog} text='Blog' />
            {/* @ts-ignore */}
            <NavLink uri={Paths.Login} text='Login' />
        </F>}
        <NavBurger />
    </div>
}
