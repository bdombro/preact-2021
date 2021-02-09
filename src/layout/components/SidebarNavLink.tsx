import { FunctionalComponent, h } from 'preact'

import * as i from '~/lib/icons'
import {LocationCtx} from '~/lib/router'
import styled from '~/lib/styled'

interface NavLinkProps { path: string, title: string, Icon?: FunctionalComponent }

export default function NavLink({ path, title, Icon = i.Info }: NavLinkProps) {
	const [{pathname}] = LocationCtx.use()
	const isActive = path === '/' ? pathname === '/' : pathname.startsWith(path)
	return (
		<NavLinkA
			href={path + (isActive ? '?stack=reset' : '')}
			class={isActive ? 'active' : ''}
		>
			<div><Icon /></div>
			<NavLinkText>{title}</NavLinkText>
		</NavLinkA>
	)
}
const NavLinkA = styled.a`
	:root {
			padding: 18px 0 14px 14px;
			color: var(--black);
			display: flex;
			flex-direction: row;
	}
	:root:hover {
			background: var(--nav-background-hover);
	}
	:root.active, :root.active:hover {
			background: var(--nav-background-active);
			color: var(--nav-text-active);
	}
`
const NavLinkText = styled.div`
	:root {padding: 3px 14px 3px 20px;}
`