import { h } from 'preact'

import { useLocation } from '~/lib/router'
import styled from '~/lib/styled'

interface NavLinkProps { uri: string, text: string, Icon: any }

export default function NavLink({ uri, text, Icon }: NavLinkProps) {
	const pathname = useLocation().pathname
	const isActive = uri === '/' ? pathname === '/' : pathname.startsWith(uri)
	return (
		<NavLinkA
			href={uri + (isActive ? '?stack=reset' : '')}
			class={isActive ? 'active' : ''}
		>
			<div><Icon /></div>
			<NavLinkText>{text}</NavLinkText>
		</NavLinkA>
	)
}
const NavLinkA = styled.a`
	:root {
			padding: 18px 0 14px 14px;
			color: var(--text);
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