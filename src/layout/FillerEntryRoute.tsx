import { h } from 'preact'

import {PageMetaCtx, RouteType} from '~/lib/router'

import BackButton from './components/BackButton'

export default function FillerEntryFactory({ route }: { route: RouteType }) {
	const id = new URLSearchParams(location.search).get('id')
	PageMetaCtx.set({ title: `${name} ${id}` })
	return <div style={{padding: '0 10px'}}>
		<BackButton />
		<h1 style={{ marginTop: 40 }}>Hello, {route.title}:{id}!</h1>
		<ul>
			<li><a href={location.pathname + '?id=' + Math.random()} >Random Post</a></li>
			<li><a href={'?stack=back'}>Go Back</a></li>
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