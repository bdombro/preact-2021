import { h } from 'preact'

import { ToastCtx } from '~/App.context'
import * as i from '~/lib/icons'
import { nav, RouteType } from '~/lib/router'

import BackButton from './components/BackButton'
import PaddedPage from './components/PaddedPage'

export default function FillerCreateFactory({ route }: { route: RouteType }) {
	const stackPath = location.pathname.split('/').slice(0, -1).join('/')
	const listPath = stackPath + '/home'
	return <PaddedPage>
		<h1><BackButton />{route.title}</h1>
		<form action="create" onSubmit={onSubmit}>
			<button type="submit" class='primary'>Submit</button>
		</form>
	</PaddedPage>

	function onSubmit() {
		ToastCtx.set({message: 'Record created!', icon: 'success', duration: 3e3, location: 'right'})
		window.dispatchEvent(new Event('#stack-pop'))
		nav(listPath, { replace: true }) 
	}
}
