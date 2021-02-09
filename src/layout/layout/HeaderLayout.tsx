import { ComponentChildren, h } from 'preact'

import { AuthCtx } from '~/App.context'
import * as i from '~/lib/icons'
import { ContentDiv } from '~/lib/router'
import styled from '~/lib/styled'
import { Paths, routes } from '~/routes'

import Navbar from '../components/Navbar'
import SidebarRight from '../components/SidebarRight'
import type { NavLinks } from '../types'

export default function HeaderLayout(p: { 
	topLinks: NavLinks
	rightLinks: NavLinks
	children: ComponentChildren
 }) {
	return (
		<HeaderLayoutDiv>
			<Navbar navLinks={p.topLinks}/>
			<SidebarRight 
				navLinks={p.rightLinks}
			/>
			<ContentDiv>
				{p.children}
			</ContentDiv>
		</HeaderLayoutDiv>
	)
}
const HeaderLayoutDiv = styled.div`
	:root {
		--header-height: 48px;
		--sidebarRight-width: 200px;
		--white-height: calc( 100vh - var(--header-height) );
		--margin-bottom: 0;
		--margin-left: 0;
	}

	:root {
		margin-top: var(--header-height);
		margin-bottom: var(--margin-bottom);
		margin-left: var(--margin-left);
	}
`