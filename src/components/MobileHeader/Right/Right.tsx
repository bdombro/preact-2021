import styles from './Right.module.css'
import { h } from 'preact'
import Burger from './Burger'

export default function Right() {
    return <div className={styles.right}>
        <Burger />
    </div>
}
