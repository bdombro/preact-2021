import '~/lib/forms'

import { h } from 'preact'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'

import { SidebarRightCtx } from '~/App.context'
import {useMedia} from '~/lib/hooks'
import * as i from '~/lib/icons'
import {LocationCtx, nav} from '~/lib/router'
import styled from '~/lib/styled'
import { Paths } from '~/routes'

import type { NavLinkProps, NavLinks } from '../types'

export default function Navbar({ sidebarLeft, navLinks }: { sidebarLeft?: boolean, navLinks: NavLinks}) {
	const isWide = useMedia('(min-width: 700px)')
	return <NavbarDiv>
		<div>
			{sidebarLeft && isWide && (
				<LeftBurgerA aria-label="Toggle Left Menu Size" href="#sidebar-toggle">
					<div><i.DotsV size={20} /></div>
				</LeftBurgerA>
			)}
			<LogoA aria-label="Home" href='/' data-burger={sidebarLeft && isWide}><div><div>
				{!sidebarLeft && <i.ReactLogo />}
				<div>Stacks!</div>
			</div></div></LogoA>
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
	:root :hover
		text-decoration: none;
`
const LeftBurgerA = styled.a`
	:root
		z-index: 2
		text-align: center
		color: white
		width: var(--sidebar-width-mini)
		height:var(--header-height)
		display: flex
		align-items: center
		justify-content: center
	:root:active,
	:root:focus
		color: white
	:root:hover
		background: var(--primary)
		color: white
	:root>div
		margin-top: 6px
	:root:active>div
		transform: translateY(3px)
`
const LogoA = styled.a`
	:root
		transform: rotate(20deg)
		margin-top: -87px
		margin-left: -14px
		padding: 100px 9px 100px 14px
	:root>div
		transform: rotate(-20deg)
	:root>div>div
		display: flex
		flex-direction: row
		align-items: center
		font-weight: bold
		padding-left: 2px
	:root:hover
		background: var(--secondary)
	:root,
	:root:focus,
	:root:active,
	:root:hover
		color: white
	:root:active>div>div
		transform: translateY(2px)
	:root svg
		color: hsl(var(--primary-h), var(--primary-s), 70%)
		margin: 0 6px 0 8px
	:root[data-burger="true"]
		margin-top: -63px
		padding: 80px 7px
`

function SearchBar() {
	const [value, setValue] = useState('')
	const [isFocused, setIsFocused] = useState(false)
	const ref = useRef<HTMLInputElement>(null)

	const onBlur = useCallback(_onBlur, [])
	const onClickClear = useCallback(_onClickClear, [])
	const onSubmit = useCallback(_onSubmit, [value])

	return <SearchBarDiv data-focused={isFocused}>
		<form action='search' onSubmit={onSubmit}>
			<div class='magglass'><i.Search size={20} horizontal /></div>
			<input
				name="query"
				value={value}
				onInput={(e: any) => setValue(e.target.value)}
				placeholder="Search"
				onFocus={() => setIsFocused(true)}
				onBlur={onBlur}
				ref={ref}
				aria-label="Search"
			/>
			<a
				href="#search-clear"
				tabIndex={0}
				onClick={onClickClear}
				class={`clear ${isFocused ? 'block' : ''}`}
			>x</a>
		</form>
	</SearchBarDiv>

	function _onBlur(e?: any) {
		if (e?.relatedTarget?.hash === '#search-clear') setValue('')
		setIsFocused(false)
		ref.current.blur()
	}
	// I don't think this is ever actually fired due to blur event preventing it,
	// but just in case it was we handle it.
	function _onClickClear(e: any) {
		e.preventDefault()
		setValue('')
		_onBlur()
	}
	function _onSubmit() { 
		setValue('')
		_onBlur()
		nav((location.pathname.includes('admin') ? Paths.AdminUserList : Paths.TenantUserList) + '?search=' + value)
	}
}
const SearchBarDiv = styled.div`
	:root
		--searchbar-width: 270px
		position: absolute
		left: var(--sidebar-width-full)
		top: 10px
		width: var(--searchbar-width)
	:root[data-focused="true"]
		--searchbar-width: 500px
	:root input
		width: 100%
		line-height: 1rem
		padding: .6em 1em .6em 3em
		background: var(--searchbar-background)
		color: var(--primary)
		border-radius: 2px
		border: none
		outline: none
		font-size: .85rem
	.dark :root input
		color: white
	:root input::placeholder
		color: var(--primary)
		opacity: 1
	.dark :root input::placeholder
		color: hsl(0,0%,80%)
	:root[data-focused="true"] input
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
	@media (max-width: 890px)
		:root[data-focused="true"]
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
		padding: 1px 10px 0
		color: white
		background: var(--primary)
	:root:hover
		color: white
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
		<NavLinkA
			aria-label={p.title}
			data-active={isActive && !isSidebarActive}
			href={p.path + (isActive && 'stack' in p ? '#stack-reset' : '')}>
			<div><div>{p.title}</div></div>
		</NavLinkA>
	)
}
const NavLinkA = styled.a`
	:root
		display: flex
		flex-direction: row
		align-items: center
		margin-top: -56px
		padding: 80px 12px
		color: white
		transform: rotate(20deg)
	:root:hover,
	:root[data-active="true"]
		background:var(--secondary)
	:root:active>div>div
		color:white
		transform: translateY(2px)
	:root:focus, :root:hover
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
	useEffect(() => {if (!isSidebarActive) setIsLinkActive(false)}, [isSidebarActive])
	const onClick = useCallback(_onClick, [])
	return (
		<NavBurgerA 
			aria-label="Toggle Right Menu"
			data-active={isLinkActive}
			href={'#navburger-click'}
			onClick={onClick}
		>
			<div>{isLinkActive ? <i.Close /> : <i.Menu />}</div>
		</NavBurgerA>
	)

	function _onClick(e: any) {
		e.preventDefault()
		setIsLinkActive(isActive => {
			setIsSidebarActive(!isActive)
			return !isActive
		})
	}
}
const NavBurgerA = styled.a`
	:root
		z-index: 2
		height: var(--header-height)
		width: 50px
		display: flex
		flex-direction: row
		align-items: center
		padding-top: 2px
		color: white
	:root:hover,
	:root[data-active="true"]
		background: var(--primary)
	:root:focus,
	:root:active,
	:root:hover
		color: white
	:root>div
		margin: auto
	:root:active>div
		transform: translateY(2px)
`
