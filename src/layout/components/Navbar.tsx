import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { SidebarRightCtx } from '~/App.context'
import { ReactLogo } from '~/lib/icons'
import { useLocation } from '~/lib/router'
import styled from '~/lib/styled'
import useMedia from '~/lib/useMedia'

interface NavLinkProps { uri: string, text: string }
type NavLinks = NavLinkProps[]

export default function Navbar({ sidebarLeft, navLinks }: { sidebarLeft?: boolean, navLinks: NavLinks}) {
	const isWide = useMedia('(min-width: 600px)')
	return <NavbarDiv>
		<div>
			{sidebarLeft && isWide && <LeftBurger href="#sidebar-toggle">Ξ</LeftBurger>}
			<LogoA href='/'>
				{!sidebarLeft && <ReactLogo />}
				<div>Stacks!</div>
			</LogoA>
		</div>

		<div>
			{isWide && navLinks.map(nl => <NavLink {...nl} />)}
			<RightBurger />
		</div>

	</NavbarDiv>
}
const NavbarDiv = styled.div`
	:root {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--header-height);
    background: var(--header-background);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
	}
	:root > div {
		height: var(--header-height);
		display: flex;
		flex-direction: row;
	}
`
const LeftBurger = styled.a`
	:root {
    padding: 15px 0px;
    text-align: center;
    width: var(--sidebar-width-mini);
    box-sizing: border-box;
    color: white;
	}
	:root:hover {
			background: var(--primary);
	}
`
const LogoA = styled.a`
	:root {
    height: var(--header-height);
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    font-weight: bold;
    padding-left: 2px;
	}
	:root:hover {
			background: var(--primary);
	}
	:root div {
			padding-right: 14px;
			color: white;
	}
	:root svg {
			color: hsl(var(--primary-h), var(--primary-s), 70%);
			margin: 0 6px 0 8px;
	}
`

function NavLink({ uri, text }: { uri: string, text: string }) {
	const location = useLocation()
	const [isSidebarActive] = SidebarRightCtx.use()
	const isActive = location.pathname.startsWith(uri)
	return (
		<NavLinkA class={isActive && !isSidebarActive ? 'active' : ''}
			href={uri + (isActive ? '?stack=reset' : '')}
		>
			{text}
		</NavLinkA>
	)
}
const NavLinkA = styled.a`
	:root {
    height: var(--header-height);
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    padding: 0 14px;
    color: white;
	}
	:root:hover, .active {
			background: var(--primary);
	}
	:root.rightBurger {
			padding: 0 20px;
	}
`

/**
 * This is a little complex b/c it can have a diff state than sidebarRight b/c the sidebar can
 * also be activated in BottomNav components. The added complexity allows NavBurger to handle 
 * this gracefully.
 */
function RightBurger() {
	const [isLinkActive, setIsLinkActive] = useState(false)
	const [isSidebarActive, setIsSidebarActive] = SidebarRightCtx.use()
	useEffect(() => {
		if (!isSidebarActive) setIsLinkActive(false)
	}, [isSidebarActive])
	return (
		<NavLinkA class={`rightBurger ${isLinkActive ? 'active' : ''}`}
			href={'#navburger-click'}
			onClick={() => {
				setIsLinkActive(isActive => {
					setIsSidebarActive(!isActive)
					return !isActive
				})
			}}
		>
			{isLinkActive ? 'X' : 'Ξ'}
		</NavLinkA>
	)
}
