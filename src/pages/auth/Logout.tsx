import { h } from 'preact'
import { useEffect } from 'preact/hooks'

import { AuthCtx } from '~/App.context'
import { nav } from '~/lib/router'


export default function Logout() {
	useEffect(() => {
		AuthCtx.logout()
		nav('/', {replace: true})
	}, [])
	return <div/>
}