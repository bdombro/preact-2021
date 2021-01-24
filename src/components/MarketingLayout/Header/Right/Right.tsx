import styles from './Right.module.css'
import { h } from 'preact'

import NavLink from './NavLink'
import { Paths } from '~/routes/router'
import NavBurger from './NavBurger'

export default function Right() {
    return <div class={styles.right}>
        <NavLink uri={Paths.Blog} text='Blog' />
        <NavLink uri={Paths.Login} text='Login' />
        <NavBurger />
    </div>
}
