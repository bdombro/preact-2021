import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { SidebarRightCtx } from '~/App.context'
import { useLocation } from '~/lib/router'

import styles from './BottomNav.module.css'

const useSidebarRight = SidebarRightCtx.use

interface NavLinkProps { uri: string, Icon: string }
type NavLinks = NavLinkProps[]


export default function BottomNav({ navLinks }: { navLinks: NavLinks }) {
	return <nav class={styles.nav}>
		{navLinks.map(nl => <NavLink {...nl} />)}
		<NavBurger />
	</nav>
}


function NavLink({ uri, Icon }: { uri: string, Icon: any }) {
	const location = useLocation()
	const [isSidebarActive] = useSidebarRight()
	const isActive = location.pathname.startsWith(uri)
	return (
		<a class={`${styles.navlink} ${isActive && !isSidebarActive && styles.active}`}
			href={uri + (isActive ? '?stack=reset' : '')}
		>
			<div><Icon /></div>
		</a>
	)
}


/**
 * This is a little more complex than the Marketing Navburger, b/c it can have a diff
 * state than sidebarRight b/c the sidebar can also be activated in the 
 * Header->Right->Navburger. The added complexity allows NavBurger to handle this
 * gracefully.
 */
function NavBurger() {
	const [isActive, setIsActive] = useState(false)
	const [isSidebarActive, setIsSidebarActive] = useSidebarRight()
	useEffect(() => {
		if (!isSidebarActive) setIsActive(false)
	}, [isSidebarActive])
	return (
		<a class={`${styles.navlink} ${isActive && styles.active}`}
			href="#sidebar-right-toggle"
			onClick={() => {
				setIsActive(isActive => {
					setIsSidebarActive(!isActive)
					return !isActive
				})
			}}
		>
			<div>{isActive ? 'X' : 'Ξ'}</div>
		</a>
	)
}