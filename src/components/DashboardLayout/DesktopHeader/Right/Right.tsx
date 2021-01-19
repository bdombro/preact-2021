import styles from './Right.module.css'
import { h } from 'preact'
import Avatar from './Avatar'

export default function Right() {
    return <div className={styles.right}>
        <Avatar />
    </div>
}
