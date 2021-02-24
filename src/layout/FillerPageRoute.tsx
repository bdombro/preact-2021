import { h } from 'preact'

import type { RouteType } from '~/lib/router'

import PaddedPage from './components/PaddedPage'
import Section from './components/Section'

export default function FillerPageFactory({ route }: { route: RouteType }) {
	return <PaddedPage>
		<Section header1={route.title}>
			<p>
				1<br /><br /><br /><br /><br />2
				<br /><br /><br /><br /><br />3<br /><br /><br /><br /><br />4
				<br /><br /><br /><br /><br />5<br /><br /><br /><br /><br />6
				<br /><br /><br /><br /><br />7<br /><br /><br /><br /><br />8
				<br /><br /><br /><br /><br />9<br /><br /><br /><br /><br />a
				<br /><br /><br /><br /><br />b<br /><br /><br /><br /><br />c
				<br />Bottom
			</p>
		</Section>
	</PaddedPage>
}
