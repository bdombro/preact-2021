import { Fragment as F, h } from 'preact'

import { SidebarRightCtx } from '~/App.context'
import NavLink from '~/layout/components/SidebarNavLink'
import styled from '~/lib/styled'

const useSidebarRight = SidebarRightCtx.use

interface NavLinkProps { uri: string, text: string, Icon: any }
type NavLinks = NavLinkProps[]

export default function SidebarRight({ navLinks }: { navLinks: NavLinks }) {
	const [isActive] = useSidebarRight()
	return isActive ? (
		<SidebarDiv>
			<SidebarNav>
				{navLinks.map(nl => <NavLink {...nl} />)}
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
	}
`
const SidebarNav = styled.nav`
	:root {
			width: var(--sidebar-width-full);
	}
`