import { Fragment as F, h } from 'preact'

import { AuthCtx, ToastCtx } from '~/App.context'
import { Paths } from '~/routes'

export default function Register() {
	const search = new URLSearchParams(location.search)
	search.set('replace', 'true')
	const searchStr = '?' + search.toString()
	return <F>
		<h1>Register</h1>
		<ul>
			<li><a href='/admin' onClick={onAdminReg}>Register as Admin</a></li>
			<li><a href='/tenant' onClick={onTenantReg}>Register as Tenant</a></li>
			<li><a href={Paths.Login + searchStr}>Have a login?</a></li>
		</ul>
	</F>

	function onAdminReg() {
		AuthCtx.loginAsAdmin()
		ToastCtx.set({ message: 'Welcome, admin!', location: 'right' })
	}
	function onTenantReg() {
		AuthCtx.loginAsTenant()
		ToastCtx.set({ message: 'Welcome, tenant!', location: 'right' })
	}
}