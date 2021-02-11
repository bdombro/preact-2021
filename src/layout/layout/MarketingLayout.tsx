import { h } from 'preact'

import { AuthCtx } from '~/App.context'
import * as i from '~/lib/icons'
import { ContentDiv } from '~/lib/router'
import styled from '~/lib/styled'
import { routes } from '~/routes'

import HeaderLayout from './HeaderLayout'

export default function MarketingLayout({ children }: { children: any }) {
	const [auth] = AuthCtx.use()
	const loginNavLink = (false
		|| auth.roles?.includes(AuthCtx.roles.admin) && { ...routes.AdminRoot, isButton: true }
		|| auth.roles?.includes(AuthCtx.roles.tenant) && { ...routes.TenantRoot, isButton: true }
		|| { ...routes.Login, isButton: true }
	)
	return (
		<HeaderLayout
			topLinks={[
				routes.Blog,
				loginNavLink,
			]}
			rightLinks={[
				routes.Home,
				routes.Blog,
				routes.About,
				loginNavLink,
				routes.Support,
			]}
		>
			{children}
		</HeaderLayout>
	)
}