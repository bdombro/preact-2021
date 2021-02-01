import './MarketingLayout.css'

import { h } from 'preact'

import * as i from '~/lib/icons'
import lazy from '~/lib/lazy'
import { Paths } from '~/routes'

const Navbar = lazy(() => import('~/layout/components/Navbar'))
const SidebarRight = lazy(() => import('~/layout/components/SidebarRight'))

export default function MarketingLayout({ children }: { children: any }) {
	return (
		<div id="marketingLayout">
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
			<div id="content">
				{children}
			</div>
		</div>
	)
}
