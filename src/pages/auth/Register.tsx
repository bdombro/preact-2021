import { Fragment as F, h } from 'preact'

import { setPageMeta } from '~/lib/router'
import { Paths } from '~/routes'

export default function Register() {
	setPageMeta({ title: 'Register' })
	const search = new URLSearchParams(location.search)
	search.set('replace', 'true')
	const searchStr = '?' + search.toString()
	return <F>
		<h1>Register</h1>
		<ul>
			<li><a href='/admin'>Register as Admin</a></li>
			<li><a href='/tenant'>Register as Tenant</a></li>
			<li><a href={Paths.Login + searchStr}>Have a login?</a></li>
		</ul>
	</F>
}