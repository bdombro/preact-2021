import { FunctionalComponent, h } from 'preact'

import * as i from '~/lib/icons'
import {LocationCtx} from '~/lib/router'
import styled from '~/lib/styled'

interface NavLinkProps { path: string, title: string, Icon?: FunctionalComponent }

export default function NavLink(p: NavLinkProps) {
	const [{pathname}] = LocationCtx.use()
	const isActive = p.path === '/' ? pathname === '/' : pathname.startsWith(p.path)
	const Icon = p.Icon ?? i.Info
	return (
		<NavLinkA
			href={p.path + (isActive && 'stack' in p ? '#stack-reset' : '')}
			class={isActive ? 'active' : ''}
		>
			<div><Icon /></div>
			<NavLinkText>{p.title}</NavLinkText>
		</NavLinkA>
	)
}
const NavLinkA = styled.a`
	:root
		padding: 18px 0 14px 14px
		color: var(--black)
		display: flex
		flex-direction: row
	:root:hover
		background: var(--nav-background-hover)
	:root.active,
	:root.active:hover,
	:root:active
		background: var(--nav-background-active)
		color: var(--nav-text-active)
	:root:active
		transform: translateY(2px)
`
const NavLinkText = styled.div`
	:root
		padding: 3px 14px 3px 20px
`