import { ComponentChildren, h } from 'preact'

import styled from '~/lib/styled'

import Navbar from '../components/Navbar'
import RoundedContent from '../components/RoundedContent'
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
			<RoundedContent>
				{p.children}
			</RoundedContent>
		</HeaderLayoutDiv>
	)
}
const HeaderLayoutDiv = styled.div`
	:root
		--sidebarRight-width: 200px
		--body-height: calc( var(--vh) - var(--header-height) )
		--margin-bottom: 0px
		--margin-left: 0px
		margin-top: var(--header-height)
		margin-bottom: var(--margin-bottom)
		margin-left: var(--margin-left)
		background: var(--white)
`
