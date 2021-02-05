import { Fragment as F, h } from 'preact'

import { AuthCtx } from '~/App.context'
import {setPageMeta} from '~/lib/router'
import { Paths } from '~/routes'

export default function Login() {
	setPageMeta({ title: 'Login' })
	const search = new URLSearchParams(location.search)
	search.set('replace', 'true')
	const searchStr = '?' + search.toString()

	return <F>
		<h1>Login</h1>
		<ul>
			<li><a href='/admin' onClick={onAdminLogin}>Login as Admin</a></li>
			<li><a href='/tenant' onClick={onTenantLogin}>Login as Tenant</a></li>
			<li><a href={Paths.Register + searchStr}>Want to register?</a></li>
			<li><a href={Paths.ForgotPassword + searchStr}>Forgot your password?</a></li>
		</ul>
	</F>

	function onAdminLogin() {AuthCtx.loginAsAdmin()}
	function onTenantLogin() { AuthCtx.loginAsTenant() }
}