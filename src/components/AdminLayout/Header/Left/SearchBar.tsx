import styles from './SearchBar.module.css'
import { h } from 'preact';
import { useRef, useState } from 'preact/hooks';
import { Search } from '~/components/icons';

export default function SearchBar() {
    const [value, setValue] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const sidebarRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef(null);
    return <div class={styles.searchbar} ref={sidebarRef}>
        <form action='search' onSubmit={onSubmit}>
            <div class={styles.magglass}><Search size={20} horizontal /></div>
            <input
                class={styles.input} 
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
                class={`${styles.clear} ${isFocused && styles.show}`}
            >x</a>
        </form>
    </div>

    function onFocus() {
        const focusedWidth = getComputedStyle(sidebarRef.current).getPropertyValue('--searchbar-width-focused')
        sidebarRef.current.style.setProperty('--searchbar-width', focusedWidth)
        setIsFocused(true)
    }
    function onBlur(e?: any) {
        if (e?.relatedTarget?.pathname === '/search/clear') setValue('')
        const defaultWidth = getComputedStyle(sidebarRef.current).getPropertyValue('--searchbar-width-default')
        sidebarRef.current.style.setProperty('--searchbar-width', defaultWidth)
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