import { h } from 'preact'
import { useEffect } from 'preact/hooks'

import { nav } from '~/lib/router'


export default function Logout() {
	useEffect(() => {nav('/', {replace: true})})
	return <div/>
}