import { h } from 'preact'

import * as i from '~/lib/icons'
import styled from '~/lib/styled'
import { Paths } from '~/routes'

import ContentDiv from '../components/ContentDiv'
import Navbar from '../components/Navbar'
import SidebarRight from '../components/SidebarRight'

export default function MarketingLayout({ children }: { children: any }) {
	return (
		<MarketingLayoutDiv>
			<Navbar 
				navLinks={[
					{uri: Paths.Blog, text: 'Blog'},
					{uri: Paths.Login, text: 'Login' },
				]}
			/>
			<SidebarRight 
				navLinks={[
					{ uri: Paths.Home, text: 'Home', Icon: i.Home },
					{ uri: Paths.Blog, text: 'Blog', Icon: i.Post },
					{ uri: Paths.Support, text: 'Support', Icon: i.Info },
					{ uri: Paths.Login, text: 'Login', Icon: i.Login },
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
		background: var(--body);
		overflow: hidden;
		margin-top: var(--header-height);
		margin-bottom: var(--margin-bottom);
		margin-left: var(--margin-left);
	}
`