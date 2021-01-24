import { h } from 'preact';
import { Paths } from '~/routes/router';
import styles from '~/components/MarketingLayout/Header/Right/Right.module.css'
import NavLink from './NavLink';
import NavBurger from './NavBurger';

export default function Nav() {
    return <nav class={styles.right}>
        <NavLink uri={Paths.Support} text='Need Help?' />
        <NavBurger />
    </nav>
}