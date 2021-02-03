import { h } from 'preact'

import NavLink from '~/layout/components/SidebarNavLink'
import styled from '~/lib/styled'

interface NavLinkProps { uri: string, text: string, Icon: any }
type NavLinks = NavLinkProps[]

export default function Sidebar({ navLinks }: { navLinks: NavLinks }) {
	return (
		<SidebarDiv>
			<Nav>
				{navLinks.map(nl => <NavLink {...nl} />)}
			</Nav>
		</SidebarDiv>
	)
}
const SidebarDiv = styled.div`
	:root {
			position: fixed;
			top: var(--header-height);
			left: 0;
			width: var(--sidebar-width);
			background: var(--nav-background);
			height: var(--body-height);
			overflow-x: hidden;
	}
`
const Nav = styled.nav`
	:root {
			width: var(--sidebar-width-full);
	}
`