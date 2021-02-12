import { h } from 'preact'

import { nav, RouteType } from '~/lib/router'
import styled from '~/lib/styled'

import CmsTable from './components/CmsTable'
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
		<CmsTable
			cols={[
				{ title: 'Name', sortable: true, sortDefault: 'asc' },
				{ title: 'Email', sortable: true },
				{ title: 'Role' },
				{ title: 'Tenant' }
			]}
			categories={[
				{ title: 'All', count: 16 },
				{ title: 'Administrator', count: 16 },
			]}
			bulkOptions={[
				{ title: 'Delete', cb(selection) { alert(`Deleted ${selection.length} items`) } }
			]}
			pages={4}
			total={16}
			rows={[
				[<a href={`${entryPath}?id=Nancy Smith1`}>Nancy Smith1</a>, <a href="mailto:nancy@smith1.com">nancy@smith1.com</a>, 'Administrator', '—'],
				[<a href={`${entryPath}?id=Nancy Smith2`}>Nancy Smith2</a>, <a href="mailto:nancy@smith2.com">nancy@smith2.com</a>, 'Administrator', '—'],
				[<a href={`${entryPath}?id=Nancy Smith3`}>Nancy Smith3</a>, <a href="mailto:nancy@smith3.com">nancy@smith3.com</a>, 'Administrator', '—'],
				[<a href={`${entryPath}?id=Nancy Smith4`}>Nancy Smith4</a>, <a href="mailto:nancy@smith4.com">nancy@smith4.com</a>, 'Administrator', '—'],
			]}
			
		/>
	</PaddedPage>
}
const AddNewButton = styled.button`
	:root
		position: relative
		top: -4px
		left: .7rem
		font-weight: bold
		color: var(--primary)
	.dark :root
		color: var(--links)
`


