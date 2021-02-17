import { h } from 'preact'
import { useCallback, useState } from 'preact/hooks'

import { ToastCtx } from '~/App.context'
import { nav, RouteType } from '~/lib/router'
import styled from '~/lib/styled'

import CmsTable from './components/CmsTable'
import PaddedPage from './components/PaddedPage'

export default function FillerListFactory({ route }: { route: RouteType }) {
	const stackPath = location.pathname.split('/').slice(0, -1).join('/')
	const createPath = stackPath + '/create'
	const entryPath = stackPath + '/entry'
	const gotoCreate = useCallback(function _gotoCreate() {nav(createPath)}, [])
	
	return <PaddedPage>
		<h1>
			{route.title}
			<AddNewButton href={createPath} class='button'>Add New</AddNewButton>
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
				{ title: 'Delete', cb(selection) { ToastCtx.set({ message: `Deleted ${selection.length} items`, icon: 'success', location: 'right' }) } }
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
const AddNewButton = styled.a`
	:root
		position: relative
		top: -5px
		left: .7rem
		font-weight: initial
`
