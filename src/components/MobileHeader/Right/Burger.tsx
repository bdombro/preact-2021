import styles from  './Burger.module.css'
import { h } from 'preact';
import { useState } from 'preact/hooks';

export default function Burger() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <a className={`${styles.avatar} ${isOpen && styles.open}`} 
           href="#open-sidebar" 
           onClick={onClick}>
           {isOpen ? "X" : "Ξ"}
        </a>
    )

    function onClick(e: any) {
        e.preventDefault()
        window.dispatchEvent(new Event('toggle-sidebar-right'))
        setIsOpen(isOpen => !isOpen)
    }
}