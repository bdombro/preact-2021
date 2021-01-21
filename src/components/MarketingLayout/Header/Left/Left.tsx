import styles from './Left.module.css'
import { h } from 'preact'

import Logo from './Logo'

export default function Left() {
    return <div className={styles.left}>
        <Logo />
    </div>
}
