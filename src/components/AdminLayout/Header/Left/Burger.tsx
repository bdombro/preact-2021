import styles from  './Burger.module.css'
import { h } from 'preact';

export default function Burger() {
    return (
        <a class={styles.burger} 
           href="#open-menu" 
           onClick={onClick}>
           Ξ
        </a>
    )

    function onClick(e: any) {
        e.preventDefault()
        window.dispatchEvent(new Event('toggle-sidebar'))
    }
}