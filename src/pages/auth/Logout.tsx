import { h } from 'preact'
import { useEffect } from 'preact/hooks'

import { AuthCtx } from '~/App.context'


export default function Logout() {
	useEffect(() => {
		AuthCtx.logout()
	}, [])
	return <div/>
}