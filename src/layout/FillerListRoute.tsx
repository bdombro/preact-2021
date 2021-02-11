import { h } from 'preact'

import { nav, RouteType } from '~/lib/router'
import styled from '~/lib/styled'

import PaddedPage from './components/PaddedPage'

export default function FillerListFactory({ route }: { route: RouteType }) {
	const stackPath = location.pathname.split('/').slice(0, -1).join('/')
	const createPath = stackPath + '/create'
	const entryPath = stackPath + '/entry'
	return <PaddedPage>
		<h1>
			{route.title}
			<AddNewButton onClick={() => nav(createPath)}>Add New</AddNewButton>
		</h1>
		<ul>
			<li><RandomEntryA /></li>
			<li><RandomEntryA /></li>
			<li><RandomEntryA /></li>
			<li><RandomEntryA /></li>
			<li><RandomEntryA /></li>
			<li><RandomEntryA /></li>
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
	</PaddedPage>

	function RandomEntryA() {
		const id = `${route.title[0]}-${Math.ceil(Math.random() * 100)}`
		return <a href={`${entryPath}?id=${id}`} >{id}</a>
	}
}
const AddNewButton = styled.button`
	:root
		position: relative
		top: -4px
		left: .7rem
`