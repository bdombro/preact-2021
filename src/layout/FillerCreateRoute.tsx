import { h } from 'preact'

import { nav, RouteType } from '~/lib/router'

import BackButton from './components/BackButton'
import PaddedPage from './components/PaddedPage'

export default function FillerCreateFactory({ route }: { route: RouteType }) {
	const stackPath = location.pathname.split('/').slice(0, -1).join('/')
	const entryPath = stackPath + '/entry'
	return <PaddedPage>
		<h1><BackButton />{route.title}</h1>
		<form action="create" onSubmit={onSubmit}>
			<button type="submit" class='primary'>Submit</button>
		</form>
	</PaddedPage>

	function onSubmit(e: any) {
		const id = `${route.title[0]}-${Math.ceil(Math.random() * 100)}`
		window.dispatchEvent(new Event('#stack-pop'))
		nav(`${entryPath}?id=${id}`, { replace: true }) 
	}
}
