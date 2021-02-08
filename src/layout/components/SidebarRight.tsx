import { Fragment as F, FunctionalComponent, h } from 'preact'

import { SidebarRightCtx } from '~/App.context'
import NavLink from '~/layout/components/SidebarNavLink'
import styled from '~/lib/styled'

const useSidebarRight = SidebarRightCtx.use

interface NavLinkProps { path: string, title: string, Icon?: FunctionalComponent, hasAccess?: () => boolean }
type NavLinks = NavLinkProps[]

export default function SidebarRight({ navLinks }: { navLinks: NavLinks }) {
	const [isActive] = useSidebarRight()
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
	:root {
    position: absolute;
    top: var(--header-height);
    right: 0;
    width: var(--sidebarRight-width);
    background: var(--nav-background);
    height: var(--body-height);
    overflow-x: hidden;
		z-index: 2;
	}
`
const SidebarNav = styled.nav`
	:root {
			width: var(--sidebar-width-full);
	}
`