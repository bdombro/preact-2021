import styles from '~/components/MarketingLayout/Header/Right/NavBurger.module.css'
import linkStyles from '~/components/MarketingLayout/Header/Right/NavLink.module.css'
import { h } from 'preact';
import { useLayoutState } from '../../context';
import { useEffect, useState } from 'preact/hooks';

/**
 * This is a little more complex than the Marketing Navburger, b/c it can have a diff
 * state than sidebarRight b/c the sidebar can also be activated in BottomNav. The 
 * added complexity allows NavBurger to handle this gracefully.
 */
export default function NavBurger() {
    const [isActive, setIsActive] = useState(false)
    const [isSidebarActive, setIsSidebarActive] = useLayoutState().sidebarRight
    useEffect(() => {
        if (!isSidebarActive) setIsActive(false)
    }, [isSidebarActive])
    return (
        <a class={`${linkStyles.navlink} ${styles.hamburger} ${isActive ? linkStyles.active: ''}`}
            href={`#navburger-click`}
            onClick={() => {
                setIsActive(isActive => {
                    setIsSidebarActive(!isActive)
                    return !isActive
                })
            }}
        >
            {isActive ? "X" : "Ξ"}
        </a>
    )
}