import { h } from 'preact'

import qs from '~/lib/queryStrings'
import {PageMetaCtx, RouteType} from '~/lib/router'
import styled from '~/lib/styled'

import BackButton from './components/BackButton'
import PaddedPage from './components/PaddedPage'

export default function FillerEntryFactory({ route }: { route: RouteType }) {
	const {id} = qs.parse<Record<string,string>>()
	PageMetaCtx.set({ title: id })
	return <PaddedPage>
		<h1><BackButton />{id}!</h1>
		<ul>
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
		return <a href={`${location.pathname}?id=${id}`} >{id}</a>
	}
}