import { h } from 'preact'
import { useEffect } from 'preact/hooks'

import { AuthCtx, ToastCtx } from '~/App.context'
import { nav } from '~/lib/router'


export default function Logout() {
	useEffect(() => {
		AuthCtx.logout()
		ToastCtx.set({ message: 'You\'ve been logged out.', location: 'right' })
		nav('/', {replace: true})
	}, [])
	return <div/>
}