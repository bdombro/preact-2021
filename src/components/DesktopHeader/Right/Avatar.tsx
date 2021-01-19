import styles from  './Avatar.module.css'
import { h } from 'preact';

export default function Avatar() {
    return <a className={styles.avatar} href="#avatar-click" onClick={onClick}>&#926;</a>

    function onClick(e: any) {
        e.preventDefault()
        // window.dispatchEvent(new Event('toggle-sidebar'))
        alert('Avatar clicked')
    }
}