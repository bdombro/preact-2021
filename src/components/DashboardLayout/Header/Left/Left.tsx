import styles from './Left.module.css'
import { h } from 'preact'

import Burger from './Burger'
import Logo from './Logo'
import Search from './SearchBar'

export default function Left() {
    return <div className={styles.left}>
        <Burger />
        <Logo />
        <Search />
    </div>
}
