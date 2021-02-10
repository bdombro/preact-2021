import { h } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import { SidebarRightCtx } from '~/App.context'
import * as i from '~/lib/icons'
import {LocationCtx} from '~/lib/router'
import styled from '~/lib/styled'
import useMedia from '~/lib/useMedia'

import type { NavLinkProps, NavLinks } from '../types'

export default function Navbar({ sidebarLeft, navLinks }: { sidebarLeft?: boolean, navLinks: NavLinks}) {
	const isWide = useMedia('(min-width: 600px)')
	return <NavbarDiv>
		<div>
			{sidebarLeft && isWide && <LeftBurger href="#sidebar-toggle"><div>Ξ</div></LeftBurger>}
			<LogoA href='/' class={sidebarLeft && isWide ? 'withBurger' : ''}>
				<div>
					{!sidebarLeft && <i.ReactLogo />}
					<div>Stacks!</div>
				</div>
			</LogoA>
			{sidebarLeft && isWide && <SearchBar />}
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
		z-index: 2
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
	:root:active>div
		transform: translateY(2px)
`
const LogoA = styled.a`
	:root
		transform: rotate(20deg)
		margin-top: -91px
		margin-left: -14px
		padding: 100px 9px 100px 14px
		border: 5px solid var(--header-background)
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

function SearchBar() {
	const [value, setValue] = useState('')
	const [isFocused, setIsFocused] = useState(false)
	return <SearchBarDiv class={isFocused ? 'focused' : ''}>
		<form action='search' onSubmit={onSubmit}>
			<div class='magglass'><i.Search size={20} horizontal /></div>
			<input
				value={value}
				onInput={e => setValue((e.target as HTMLInputElement).value)}
				placeholder="Search"
				onFocus={() => setIsFocused(true)}
				onBlur={onBlur}
			/>
			<a
				href="#search-clear"
				tabIndex={0}
				onClick={onClickClear}
				class={`clear ${isFocused ? 'show' : ''}`}
			>x</a>
		</form>
	</SearchBarDiv>

	function onBlur(e?: any) {
		if (e?.relatedTarget?.hash === '#search-clear') setValue('')
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
const SearchBarDiv = styled.div`
	:root
		--searchbar-width: 270px
		position: absolute
		left: var(--sidebar-width-full)
		top: 10px
		width: var(--searchbar-width)
	:root.focused
		--searchbar-width: 500px
	:root input
		box-sizing: border-box
		width: 100%
		font-size: .8em
		padding: .6em 1em .6em 3em
		background: var(--searchbar-background)
		color: var(--primary)
		border-radius: 2px
		border: none
		outline: none
	.dark :root input
		color: white
	:root input::placeholder
		color: var(--primary)
		opacity: 1
	.dark :root input::placeholder
		color: hsl(0,0%,80%)
	:root.focused input
		background: var(--white)
	:root .magglass
		color: var(--primary)
		position: absolute
		left: 12px
		top: 6px
	.dark :root .magglass
		color: hsl(0,0%,80%)
	:root .clear
		display: none
		color: var(--primary)
		position: absolute
		right: 10px
		top: 2px
		font-size: 1.2em
	.dark :root .clear
		color: hsl(0,0%,80%)
	:root .clear.show
		display: block
	@media (max-width: 890px)
		:root.focused
			--searchbar-width: 270px
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

function NavLink(p: NavLinkProps) {
	const [_location] = LocationCtx.use()
	const [isSidebarActive] = SidebarRightCtx.use()
	const isActive = _location.pathname.startsWith(p.path)
	return (
		<NavLinkA class={isActive && !isSidebarActive ? 'active' : ''}
			href={p.path + (isActive && 'stack' in p ? '#stack-reset' : '')}>
			<div>{p.title}</div>
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
		border: 5px solid var(--header-background)
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
			<div>{isLinkActive ? 'X' : 'Ξ'}</div>
		</NavBurgerA>
	)
}
const NavBurgerA = styled.a`
	:root
		z-index: 2
		height: var(--header-height)
		width: 50px
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
	:root:active>div
		transform: translateY(2px)
`
