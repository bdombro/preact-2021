import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { SidebarRightCtx } from '~/App.context'
import { useLocation } from '~/lib/router'
import styled from '~/lib/styled'


const useSidebarRight = SidebarRightCtx.use

interface NavLinkProps { uri: string, text: string, Icon: any }
type NavLinks = NavLinkProps[]


export default function BottomNav({ navLinks }: { navLinks: NavLinks }) {
	return <Nav>
		{navLinks.map(nl => <NavLink {...nl} />)}
		<NavBurger />
	</Nav>
}
const Nav = styled.div`
	:root {
			will-change: scroll-position;
			position: fixed;
			bottom: 0;
			width: 100%;
			background: var(--nav-background);
			display: flex;
			flex-direction: row;
			height: var(--bottom-nav-height);
			overflow-y: hidden;
	}
`


function NavLink({ uri, Icon }: { uri: string, Icon: any }) {
	const location = useLocation()
	const [isSidebarActive] = useSidebarRight()
	const isActive = location.pathname.startsWith(uri)
	return (
		<NavLinkA class={isActive && !isSidebarActive ? 'active' : ''}
			href={uri + (isActive ? '?stack=reset' : '')}
		>
			<div><Icon /></div>
		</NavLinkA>
	)
}
const NavLinkA = styled.a`
	:root {
			color: var(--text);
			flex-grow: 1;
			text-align: center;
			padding: 8px;
			border-right: 1px solid var(--nav-background);
			border-top: 1px solid var(--nav-background);
	}
	:root:hover {
			background: var(--nav-background-active);
			border-right: 1px solid var(--nav-background-active);
			border-top: 1px solid var(--nav-background-active);
	}
	:root.active, :root.active:hover {
			color: var(--nav-text-active);
			background: var(--nav-background-active);
			border-right: 1px solid var(--nav-background-active);
			border-top: 1px solid var(--nav-background-active);
	}
	:root:last-of-type {
			border-right: none;
	}
`


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
		<NavLinkA class={isActive ? 'active' : ''}
			href="#sidebar-right-toggle"
			onClick={() => {
				setIsActive(isActive => {
					setIsSidebarActive(!isActive)
					return !isActive
				})
			}}
		>
			<div>{isActive ? 'X' : 'Ξ'}</div>
		</NavLinkA>
	)
}