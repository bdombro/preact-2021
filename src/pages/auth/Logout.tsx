import { h } from 'preact'
import { useEffect } from 'preact/hooks'

import { AuthStore } from '~/stores'


export default function Logout() {
	useEffect(() => {
		AuthStore.logout()
	}, [])
	return <div/>
}