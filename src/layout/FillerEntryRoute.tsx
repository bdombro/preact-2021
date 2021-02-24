import { h } from 'preact'

import qs from '~/lib/queryStrings'
import {PageMetaCtx, RouteType} from '~/lib/router'
import styled from '~/lib/styled'

import BackButton from './components/BackButton'
import PaddedPage from './components/PaddedPage'
import Section from './components/Section'

export default function FillerEntryFactory({ route }: { route: RouteType }) {
	const {id} = qs.parse<Record<string,string>>()
	PageMetaCtx.set({ title: id })
	return <PaddedPage>
		<h1 class='page-header'><BackButton />{id}!</h1>
		<Section header1={'Overview'}>
			<p>Nancy was a mighty fine person.</p>
		</Section>
	</PaddedPage>
}