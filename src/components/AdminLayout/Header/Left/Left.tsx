import styles from './Left.module.css'
import { h } from 'preact'
import lazy from '~/lib/lazy'

const Burger = lazy(() => import('./Burger'))
const Logo = lazy(() => import('./Logo'))
const Search = lazy(() => import('./SearchBar'))

export default function Left() {
    return <div class={styles.left}>
        <Burger />
        <Logo />
        <Search />
    </div>
}
