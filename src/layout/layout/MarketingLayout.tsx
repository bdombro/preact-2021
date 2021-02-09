import { h } from 'preact'

import { AuthCtx } from '~/App.context'
import * as i from '~/lib/icons'
import { ContentDiv } from '~/lib/router'
import styled from '~/lib/styled'
import { Paths, routes } from '~/routes'

import Navbar from '../components/Navbar'
import SidebarRight from '../components/SidebarRight'

export default function MarketingLayout({ children }: { children: any }) {
	const [auth] = AuthCtx.use()
	const loginNavLink = (false
		|| auth.roles?.includes(AuthCtx.roles.admin) && { ...routes.AdminRoot, isButton: true }
		|| auth.roles?.includes(AuthCtx.roles.tenant) && { ...routes.TenantRoot, isButton: true }
		|| { ...routes.Login, isButton: true }
	)
	return (
		<MarketingLayoutDiv>
			<Navbar 
				navLinks={[
					routes.Blog,
					loginNavLink,
				]}
			/>
			<SidebarRight 
				navLinks={[
					routes.Home,
					routes.Blog,
					routes.About,
					routes.Support,
					loginNavLink,
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