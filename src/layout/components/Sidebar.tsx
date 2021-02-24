import { h } from 'preact'

import NavLink from '~/layout/components/SidebarNavLink'
import * as i from '~/lib/icons'
import styled from '~/lib/styled'

import type { NavLinks } from '../types'

export default function Sidebar({ navLinks }: { navLinks: NavLinks }) {
	return (
		<SidebarDiv>
			<SidebarHeader />
			<Nav>
				{navLinks
					.filter(nl => nl.hasAccess ? nl.hasAccess() : true)
					.map(nl => <NavLink {...nl} />)}
			</Nav>
		</SidebarDiv>
	)
}
const SidebarDiv = styled.div`
	:root
		position: fixed
		top: var(--header-height)
		left: 0
		width: var(--sidebar-width)
		background: var(--sidebar-background)
		height: var(--body-height)
		z-index: 1
	.dark :root
		background: var(--gray1)
`

export function SidebarHeader() {
	return (
		<SidebarHeaderDiv>
			<div class='left'>
				<i.Person size={76} class="svg-div"/>
				<div class='label'>Free</div>
			</div>
			<div class='right'>
				<div class='top'>Active</div>
				<div class='middle'>Nancy Dombrowski</div>
				<div class='bottom'>nancy.smith@gmail.com</div>
			</div>
			<a class='toggle' href='#sidebar-toggle'>
				<i.ChevronL2x size={28} class="collapse"/>
				<i.ChevronR2x size={28} class="expand" />
			</a>
		</SidebarHeaderDiv>
	)
}
const SidebarHeaderDiv = styled.div`
	:root
		--border-color: var(--gray5)
		width: var(--sidebar-width)
		position: relative
		display: flex
		flex-direction: row
		align-items: center
		padding: 18px 0 24px 10px
		border-bottom: 2px solid var(--border-color)
		/*margin-bottom: 12px*/
	:root>.left
		position: relative
		display: flex
		flex-direction: column
		align-items: center
		padding-right: 12px
	:root>.left>.svg-div
		color: var(--gray8)
		background: var(--gray4)
		border-radius: 100px
		padding: 8px 8px 10px
	:root>.left>.label
		font-family: var(--font-serif);
		text-transform: uppercase
		font-size: .6rem
		font-weight: bold
		padding: .2rem .5rem
		color: var(--gray9)
		margin: -10px
		background: var(--gray4)
		border-radius: 3px
		border: 1px solid var(--border-color)
	:root>.right
		flex-grow: 1
	.miniSidebar :root>.right
		display: none
	:root>.right>.top
		color: var(--gray8)
		font-weight: bold
		font-size: .8rem
		margin-bottom: .2rem
	:root>.right>.bottom
		margin-top: .4rem
		color: var(--gray10)
		font-size: .7rem
	:root>.toggle
		color: var(--gray8)
		background: var(--border-color)
		position: absolute
		right: -14px
		bottom: -15px
		width: 28px
		height: 28px
		border-radius: 40px
	:root>.toggle:hover
		background: var(--gray4)
	.miniSidebar :root>.toggle>.collapse
		display: none
	:root>.toggle>.expand
		display: none
	.miniSidebar :root>.toggle>.expand
		display: block
`
const Nav = styled.nav`
	:root
		visibility: visible
	.miniSidebar :root .navlinkText
		display: none
`