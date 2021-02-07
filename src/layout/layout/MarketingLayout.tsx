import { h } from 'preact'

import { AuthCtx } from '~/App.context'
import * as i from '~/lib/icons'
import { ContentDiv } from '~/lib/router'
import styled from '~/lib/styled'
import { Paths } from '~/routes'

import Navbar from '../components/Navbar'
import SidebarRight from '../components/SidebarRight'

export default function MarketingLayout({ children }: { children: any }) {
	const [auth] = AuthCtx.use()
	const loginNavLink = (false
		|| auth.roles?.includes(AuthCtx.roles.admin) && { uri: Paths.AdminRoot, text: 'Dashboard', Icon: i.Counter, isButton: true }
		|| auth.roles?.includes(AuthCtx.roles.admin) && { uri: Paths.TenantRoot, text: 'Dashboard', Icon: i.Counter, isButton: true }
		|| { uri: Paths.Login, text: 'Login', Icon: i.Login, isButton: true }
	)
	return (
		<MarketingLayoutDiv>
			<Navbar 
				navLinks={[
					{uri: Paths.Blog, text: 'Blog'},
					loginNavLink,
				]}
			/>
			<SidebarRight 
				navLinks={[
					{ uri: Paths.Home, text: 'Home', Icon: i.Home },
					{ uri: Paths.Blog, text: 'Blog', Icon: i.Post },
					{ uri: Paths.About, text: 'About', Icon: i.Info },
					{ uri: Paths.Support, text: 'Support', Icon: i.Info },
					loginNavLink,
					{ uri: '#theme-toggle', text: 'Theme', Icon: i.Palette },
				]}
			/>
			<ContentDiv>
				{children}
			</ContentDiv>
		</MarketingLayoutDiv>
	)
}
const MarketingLayoutDiv = styled.div`
	:root {
		--header-height: 48px;
		--sidebarRight-width: 200px;
		--body-height: calc( 100vh - var(--header-height) );
		--margin-bottom: 0;
		--margin-left: 0;
	}

	:root {
		margin-top: var(--header-height);
		margin-bottom: var(--margin-bottom);
		margin-left: var(--margin-left);
	}
`