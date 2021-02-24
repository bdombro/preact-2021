import { h } from 'preact'
import { useLayoutEffect } from 'preact/hooks'

import { AuthCtx } from '~/App.context'
import * as i from '~/lib/icons'
import { ContentDiv } from '~/lib/router'
import styled from '~/lib/styled'
import { routes } from '~/routes'

import { applyTheme, defaultTheme } from '../theme'
import HeaderLayout from './HeaderLayout'

export default function MarketingLayout({ children }: { children: any }) {
	const [auth] = AuthCtx.use()
	useLayoutEffect(() => applyTheme(defaultTheme))
	const loginNavLink = { ...(auth.id ? routes.Dashboard : routes.Login), isButton: true }
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