import { h } from 'preact'

import type { RouteType } from '~/lib/router'

export default function FillerHomeFactory({ route }: { route: RouteType }) {
	const listPath = location.pathname.split('/').slice(0, -1).join('/') + '/list'
	const entryPath = location.pathname.split('/').slice(0, -1).join('/') + '/entry'
	return <div style={{ padding: '0 10px' }}>
		<h1>Hello, {route.title}!</h1>
		<ul>
			<li><a href={listPath} >List Route</a></li>
			<li><a href={entryPath + '?id=' + Math.random()} >Random Entry</a></li>
		</ul>
		<p>
			<br /><br /><br /><br /><br />1<br /><br /><br /><br /><br />2
			<br /><br /><br /><br /><br />3<br /><br /><br /><br /><br />4
			<br /><br /><br /><br /><br />5<br /><br /><br /><br /><br />6
			<br /><br /><br /><br /><br />7<br /><br /><br /><br /><br />8
			<br /><br /><br /><br /><br />9<br /><br /><br /><br /><br />a
			<br /><br /><br /><br /><br />b<br /><br /><br /><br /><br />c
			<br />Bottom
		</p>
	</div>
	
}