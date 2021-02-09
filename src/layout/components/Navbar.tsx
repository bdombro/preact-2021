import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { SidebarRightCtx } from '~/App.context'
import { ReactLogo } from '~/lib/icons'
import {LocationCtx} from '~/lib/router'
import styled from '~/lib/styled'
import useMedia from '~/lib/useMedia'

import type { NavLinks } from '../types'

export default function Navbar({ sidebarLeft, navLinks }: { sidebarLeft?: boolean, navLinks: NavLinks}) {
	const isWide = useMedia('(min-width: 600px)')
	return <NavbarDiv>
		<div>
			{sidebarLeft && isWide && <LeftBurger href="#sidebar-toggle">Ξ</LeftBurger>}
			<LogoA href='/' class={sidebarLeft && isWide ? 'withBurger' : ''}>
				<div>
					{!sidebarLeft && <ReactLogo />}
					<div>Stacks!</div>
				</div>
			</LogoA>
		</div>

		<div>
			{isWide && navLinks
				.filter(nl => nl.hasAccess ? nl.hasAccess() : true)
				.map(nl => 'isButton' in nl ? <NavButton {...nl} /> : <NavLink {...nl} />)}
			<RightBurger />
		</div>

	</NavbarDiv>
}
const NavbarDiv = styled.div`
	:root
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: var(--header-height)
    background: var(--header-background)
    display: flex
    flex-direction: row
    justify-content: space-between
		overflow: hidden
	:root>div
		height:var(--header-height)
		display:flex
		flex-direction:row
`
const LeftBurger = styled.a`
	:root
    padding: 15px 0px
    text-align: center
    width: var(--sidebar-width-mini)
    box-sizing: border-box
    color: white
	:root:active,
	:root:focus
		color: white
	:root:hover
		background: var(--primary)
`
const LogoA = styled.a`
	:root
		transform: rotate(20deg)
		margin-top: -91px
		margin-left: -14px
		padding: 100px 9px 100px 14px
		border: 5px solid hsl(0,0%,0%)
	:root>div
		transform: rotate(-20deg)
    display: flex
    flex-direction: row
    align-items: center
    box-sizing: border-box
    font-weight: bold
    padding-left: 2px
	:root:hover
		background: var(--primary)
	:root,
	:root:focus,
	:root:active
		color: white
	:root:active
		border: 5px solid var(--secondary)
	:root svg
			color: hsl(var(--primary-h), var(--primary-s), 70%)
			margin: 0 6px 0 8px
	:root.withBurger
		margin-top: -68px
		padding: 80px 7px
`

function NavButton({ path, title }: { path: string, title: string }) {
	return (
		<NavButtonA href={path}>
			{title}
		</NavButtonA>
	)
}
const NavButtonA = styled.a`
	:root
		z-index: 2
    height: calc( var(--header-height) - 14px )
		margin: 7px 4px 6px 12px
		border-radius: 3px
    display: flex
    flex-direction: row
    align-items: center
    box-sizing: border-box
    padding: 1px 10px 0
    color: white
		background: var(--primary)
	:root:hover
		background: var(--primary-hover)
	:root:active
		color:white
		transform: translateY(2px)
	:root:focus
		color: white
`

function NavLink({ path, title }: { path: string, title: string }) {
	const [_location] = LocationCtx.use()
	const [isSidebarActive] = SidebarRightCtx.use()
	const isActive = _location.pathname.startsWith(path)
	return (
		<NavLinkA class={isActive && !isSidebarActive ? 'active' : ''}
			href={path + (isActive ? '?stack=reset' : '')}
		>
			<div>{title}</div>
		</NavLinkA>
	)
}
const NavLinkA = styled.a`
	:root
    display: flex
    flex-direction: row
    align-items: center
    margin-top: -60px
    padding: 80px 14px
    color: white
		border: 5px solid hsl(0,0%,0%)
		box-sizing: border-box
		transform: rotate(20deg)
	:root:hover,
	:root.active
		background:var(--secondary)
	:root:active
		color:white
		border: 5px solid var(--primary)
	:root:focus
		color:white
	:root>div
		transform: rotate(-20deg)
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
		<NavBurgerA class={isLinkActive ? 'active' : ''}
			href={'#navburger-click'}
			onClick={() => {
				setIsLinkActive(isActive => {
					setIsSidebarActive(!isActive)
					return !isActive
				})
			}}
		>
			{isLinkActive ? 'X' : 'Ξ'}
		</NavBurgerA>
	)
}
const NavBurgerA = styled.a`
	:root
		z-index: 2
    height: var(--header-height)
    display: flex
    flex-direction: row
    align-items: center
    box-sizing: border-box
    padding: 0 20px
    color: white
	:root:hover,
	:root.active
		background: var(--primary)
	:root:focus,
	:root:active
		color: white
`
