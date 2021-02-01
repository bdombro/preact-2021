import { h } from 'preact'

import { SidebarRightCtx } from '~/App.context'
import NavLink from '~/layout/components/SidebarNavLink'

import styles from './SidebarRight.module.css'

const useSidebarRight = SidebarRightCtx.use

interface NavLinkProps { uri: string, text: string, Icon: any }
type NavLinks = NavLinkProps[]

export default function SidebarRight({ navLinks }: { navLinks: NavLinks }) {
	const [isActive] = useSidebarRight()
	return isActive && (
		<div class={`${styles.sidebar}`}>
			<nav class={styles.nav}>
				{navLinks.map(nl => <NavLink {...nl} />)}
			</nav>
		</div>
	)
}
