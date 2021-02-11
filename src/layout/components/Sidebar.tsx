import { FunctionalComponent, h } from 'preact'

import NavLink from '~/layout/components/SidebarNavLink'
import styled from '~/lib/styled'

import type { NavLinks } from '../types'

export default function Sidebar({ navLinks }: { navLinks: NavLinks }) {
	return (
		<SidebarDiv>
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
		background: var(--nav-background)
		height: var(--body-height)
		overflow-x: hidden
`
const Nav = styled.nav`
	:root
		width: var(--sidebar-width-full)
`