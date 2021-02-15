import { Fragment as F, h } from 'preact'

import { AuthCtx, ToastCtx } from '~/App.context'
import { Paths } from '~/routes'

export default function Login() {
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

	function onAdminLogin() {
		AuthCtx.loginAsAdmin()
		ToastCtx.set({ message: 'Welcome, admin!', location: 'right' })
	}
	function onTenantLogin() {
		AuthCtx.loginAsTenant()
		ToastCtx.set({ message: 'Welcome, tenant!', location: 'right' })
	}
}