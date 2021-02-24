import { Fragment as F, FunctionalComponent, h } from 'preact'

import { SidebarRightCtx } from '~/App.context'
import NavLink from '~/layout/components/SidebarNavLink'
import styled from '~/lib/styled'

import type { NavLinks } from '../types'

export default function SidebarRight({ navLinks }: { navLinks: NavLinks }) {
	const [isActive] = SidebarRightCtx.use()
	return isActive ? (
		<SidebarDiv>
			<SidebarNav>
				{navLinks
					.filter(nl => nl.hasAccess ? nl.hasAccess() : true)
					.map(nl => <NavLink {...nl} />)}
			</SidebarNav>
		</SidebarDiv>
	) : <F />
}
const SidebarDiv = styled.div`
	:root
		position: absolute
		top: var(--header-height)
		right: 0
		width: var(--sidebarRight-width)
		background: var(--sidebar-background)
		height: var(--body-height)
		overflow-x: hidden
		z-index: 2
	.dark :root
		background: var(--gray1)
`
const SidebarNav = styled.nav`
	:root
		width: var(--sidebarRight-width)
`