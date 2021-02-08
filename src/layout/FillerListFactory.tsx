import { h } from 'preact'

import BackButton from './components/BackButton'

export default function FillerEntryFactory(name: string) {
	return () => {
		const entryPath = location.pathname.split('/').slice(0, -1).join('/') + '/entry'
		return <div style={{ padding: '0 10px' }}>
			<BackButton />
			<h1 style={{marginTop:40}}>Hello, {name}!</h1>
			<ul>
				<li><a href={entryPath + '?id=' + Math.random()} >Random Entry 1</a></li>
				<li><a href={entryPath + '?id=' + Math.random()} >Random Entry 2</a></li>
				<li><a href={entryPath + '?id=' + Math.random()} >Random Entry 3</a></li>
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
}