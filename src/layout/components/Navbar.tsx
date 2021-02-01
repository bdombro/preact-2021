import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { SidebarRightCtx } from '~/App.context'
import { ReactLogo } from '~/lib/icons'
import { useLocation } from '~/lib/router'
import useMedia from '~/lib/useMedia'

import styles from './Navbar.module.css'

const useSidebarRight = SidebarRightCtx.use

interface NavLinkProps { uri: string, text: string }
type NavLinks = NavLinkProps[]

export default function Navbar({ sidebarLeft, navLinks }: { sidebarLeft?: boolean, navLinks: NavLinks}) {
	return <div class={styles.navbar}>
		<Left sidebarLeft={sidebarLeft} />
		<Right navLinks={navLinks} />
	</div>
}


function Left({ sidebarLeft }: { sidebarLeft?: boolean }) {
	return <div class={styles.left}>
		{sidebarLeft && <a class={styles.leftBurger} href="#sidebar-toggle">Ξ</a>}
		<a class={styles.logo} href='/'>
			{!sidebarLeft && <ReactLogo />}
			<div>Stacks!</div>
		</a>
	</div>
}

function Right({ navLinks }: { navLinks: NavLinks }) {
	const isWide = useMedia('(min-width: 600px)')
	return <div class={styles.right}>
		{isWide && navLinks.map(nl => <NavLink {...nl} />)}
		<RightBurger />
	</div>
}

function NavLink({ uri, text }: { uri: string, text: string }) {
	const location = useLocation()
	const [isSidebarActive] = useSidebarRight()
	const isActive = location.pathname.startsWith(uri)
	return (
		<a class={`${styles.navlink} ${styles.hideOnMobile} ${isActive && !isSidebarActive && styles.active}`}
			href={uri + (isActive ? '?stack=reset' : '')}
		>
			{text}
		</a>
	)
}

/**
 * This is a little complex b/c it can have a diff state than sidebarRight b/c the sidebar can
 * also be activated in BottomNav components. The added complexity allows NavBurger to handle 
 * this gracefully.
 */
function RightBurger() {
	const [isLinkActive, setIsLinkActive] = useState(false)
	const [isSidebarActive, setIsSidebarActive] = useSidebarRight()
	useEffect(() => {
		if (!isSidebarActive) setIsLinkActive(false)
	}, [isSidebarActive])
	return (
		<a class={`${styles.navlink} ${styles.rightBurger} ${isLinkActive ? styles.active : ''}`}
			href={'#navburger-click'}
			onClick={() => {
				setIsLinkActive(isActive => {
					setIsSidebarActive(!isActive)
					return !isActive
				})
			}}
		>
			{isLinkActive ? 'X' : 'Ξ'}
		</a>
	)
}
