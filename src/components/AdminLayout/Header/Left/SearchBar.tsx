import styles from './SearchBar.module.css'
import { h } from 'preact';
import { useRef, useState } from 'preact/hooks';

export default function SearchBar() {
    const [value, setValue] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef(null);
    return <div className={styles.searchbar}>
        <form action='search' onSubmit={onSubmit}>
            <div className={styles.magglass}>&#934;</div>
            <input
                className={styles.input} 
                value={value} 
                ref={inputRef}
                onInput={e => setValue((e.target as HTMLInputElement).value)}
                placeholder="Search" 
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <a 
                href="/search/clear" 
                tabIndex={0}
                onClick={onClickClear} 
                className={`${styles.clear} ${isFocused && styles.show}`}
            >x</a>
        </form>
    </div>

    function onFocus() {
        const layoutElement = document.getElementById('layout')!
        const focusedWidth = getComputedStyle(layoutElement).getPropertyValue('--searchbar-width-focused')
        layoutElement.style.setProperty('--searchbar-width', focusedWidth)
        setIsFocused(true)
    }
    function onBlur(e?: any) {
        if (e?.relatedTarget?.pathname === '/search/clear') setValue('')
        const layoutElement = document.getElementById('layout')!!
        const defaultWidth = getComputedStyle(layoutElement).getPropertyValue('--searchbar-width-default')
        layoutElement.style.setProperty('--searchbar-width', defaultWidth)
        setIsFocused(false)
    }
    // I don't think this is ever actually fired due to blur event preventing it,
    // but just in case it was we handle it.
    function onClickClear(e: any) {
        e.preventDefault()
        setValue('')
        onBlur()
    }
    function onSubmit(e: any) {
        e.preventDefault()
        alert('You search for: ' + value)
    }
}