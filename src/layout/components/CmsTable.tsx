import { ComponentChildren, Fragment, FunctionalComponent, h } from 'preact'
import { StateUpdater, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'preact/hooks'

import { ToastCtx } from '~/App.context'
import * as i from '~/lib/icons'
import qs from '~/lib/queryStrings'
import { LocationCtx, nav } from '~/lib/router'
import styled from '~/lib/styled'
import useMedia from '~/lib/useMedia'
import { routesByPath } from '~/routes'

import Checkbox from './Checkbox'

interface CmsTableProps {
	cols: { title: string, sortable?: boolean, sortDefault?: 'asc' | 'desc' }[],
	categories?: { title: string, count: number }[],
	bulkOptions?: { title: string, cb: (selection: any[]) => any }[],
	pages: number,
	total: number,
	rows: (ComponentChildren)[][],
}
export default function CmsTable(p: CmsTableProps) {
	const [_location] = LocationCtx.use()
	const [checked, setChecked] = useState<Set<CmsTableProps['rows'][0]>>(new Set())
	useLayoutEffect(function reset() {setChecked(new Set())}, [_location])

	return <CmsTableDiv>
		<TableFilterDiv>
			<CategoryFilters categories={p.categories} />
			<SearchForm />
		</TableFilterDiv>
		<HeaderFooter total={p.total} pages={p.pages} bulkOptions={p.bulkOptions} checked={checked} setChecked={setChecked} />
		<table>
			<thead>
				<HeadRow cols={p.cols} rows={p.rows} checked={checked} setChecked={setChecked} />
			</thead>
			<tbody>
				{p.rows.map(row => <BodyRow cols={p.cols} row={row} checked={checked} setChecked={setChecked} />)}
			</tbody>
			<tfoot>
				<HeadRow cols={p.cols} rows={p.rows} checked={checked} setChecked={setChecked} />
			</tfoot>
		</table>
		<HeaderFooter total={p.total} pages={p.pages} bulkOptions={p.bulkOptions} checked={checked} setChecked={setChecked} isFooter />
	</CmsTableDiv>
}
const CmsTableDiv = styled.div`
	:root
		display: block
`
const TableFilterDiv = styled.div`
	:root
		position: relative
		margin-bottom: .3rem
		display: flex
		flex-direction: row
		justify-content: space-between
		align-items: center
	@media (max-width: 700px)
		:root
			display: block
`


function SearchForm() {
	const q = qs.parse()
	const tableName = routesByPath[location.pathname].title
	const onSubmit = useCallback(_onSubmit, [])

	return <SearchFormForm onSubmit={onSubmit}>
		<input name='search' value={q.search} aria-label={`Search ${tableName}`} />
		<button>Search {tableName}</button>
	</SearchFormForm>

	function _onSubmit(e: any) {
		const next = new FormData(e.target).get('search')
		if (next === (q.search || ''))
			ToastCtx.set({ message: 'Search query hasn\'t changed', icon: 'error', location: 'bottom' })
		else
			nav(qs.create({ search: next }, { upsert: true }), {replace: true})
	}
}
const SearchFormForm = styled.form`
	:root
		display: flex
		flex-direction: row
		align-items: center
`

function CategoryFilters({categories}: {categories: CmsTableProps['categories']}) {
	if (!categories || !categories?.length) return <CategoryFilterDiv>&nbsp;</CategoryFilterDiv>
	const { category = categories[0].title } = qs.parse()
	return <CategoryFilterDiv>
		{categories.map((c, i) => c.title === category
			? <span><b>{c.title}</b> ({c.count}){i < categories.length - 1 && ' | '}</span>
			: <span><a href={createUri(c.title)}>{c.title}</a> ({c.count}){i < categories.length - 1 && ' | '}</span>
		)}
	</CategoryFilterDiv>
	function createUri(next: string) {
		return (qs.create({ category: next !== categories![0].title ? next : null }, { upsert: true }) || location.pathname) + '#replace'
	}
}
const CategoryFilterDiv = styled.div`
	:root
		font-size: .9rem
		margin-bottom: .3rem
`

function HeaderFooter(p: Pick<CmsTableProps, 'total' | 'pages' | 'bulkOptions'> & { isFooter?: boolean, checked: Set<any>, setChecked: any}) {
	const page = parseInt(qs.parse().page || '1')
	
	return <HeaderFooterDiv class={p.isFooter ? 'footer' : ''}>
		<BulkActionsForm bulkOptions={p.bulkOptions} checked={p.checked} setChecked={p.setChecked} />
		<CountDiv>
			<div>{p.total} items&nbsp;</div>
			{p.pages > 1 && <Fragment>
				<PageButton title='First Page' page={page} pages={p.pages} pageTo={1}>«</PageButton>
				<PageButton title='Go back one page' page={page} pages={p.pages} pageTo={page - 1}>‹</PageButton>
				<div>&nbsp;{page} of {p.pages}&nbsp;</div>
				<PageButton title='Go forward one page' page={page} pages={p.pages} pageTo={page + 1}>›</PageButton>
				<PageButton title='Go to last page' page={page} pages={p.pages} pageTo={p.pages}>»</PageButton>
			</Fragment>}
		</CountDiv>
	</HeaderFooterDiv>
}
const HeaderFooterDiv = styled.div`
	:root
		display: flex
		flex-direction: row
		justify-content: space-between
	@media (max-width: 700px)
		:root
			flex-direction: column-reverse
		:root.footer
			flex-direction: column
`
const CountDiv = styled.div`
	:root
		display: flex
		flex-direction: row
		align-items: center
		font-size: .9rem
		margin-bottom: .3rem
	:root > *
		margin: 0 .1rem
`

function PageButton(p: Pick<CmsTableProps, 'pages'> & { title: string, page: number, pageTo: number, children: ComponentChildren }) {
	const onClick = useCallback(_onClick, [p.page, p.pageTo])
	if (p.pageTo < 1) p.pageTo = 1
	if (p.pageTo > p.pages) p.pageTo = p.pages
	return <div>
		<a
			title={p.title}
			class={`button ${p.pageTo === p.page ? 'disabled' : ''}`}
			onClick={onClick}
			href={(qs.create({ page: p.pageTo !== 1 ? p.pageTo : null }, { upsert: true }) || location.pathname) + '#replace'}>
			{p.children}
		</a>
	</div>
	function _onClick(e: any) {
		if (p.pageTo === p.page) {
			e.preventDefault()
			ToastCtx.set({ message: `You're already on the ${p.pageTo === 1 ? 'first' : 'last'} page`, icon: 'error', location: 'bottom' })
		}
	}
}

function BulkActionsForm(p: Pick<CmsTableProps, 'bulkOptions'> & { checked: Set<CmsTableProps['rows'][0]>, setChecked: StateUpdater<Set<CmsTableProps['rows'][0]>>}) {
	const [action, setAction] = useState('-1')
	const onClick = useCallback(_onClick, [action, p.checked])
	const onChange = useCallback((e: any) => setAction(e.target.value), [])
	return <BulkActionsFormDiv>
		<select aria-label="Bulk Actions" name="action" value={action} onChange={onChange}>
			<option value="-1">Bulk Actions</option>
			{p.bulkOptions?.map(o => <option value={o.title}>{o.title}</option>)}
		</select>
		<button onClick={onClick}>Apply</button>
	</BulkActionsFormDiv>

	function _onClick() {
		if (action === '-1') return ToastCtx.set({ message: 'No action selected', icon: 'error', location: 'bottom' })
		if (!p.checked.size) return ToastCtx.set({ message: 'No rows selected', icon: 'error', location: 'bottom' })
		p.bulkOptions?.find(o => o.title === action)!.cb([...p.checked])
		p.setChecked(new Set())
	}
}
const BulkActionsFormDiv = styled.div`
	:root
		display: flex
		flex-direction: row
		align-items: center
		margin-bottom: .3rem
`

function HeadRow(p: Pick<CmsTableProps, 'cols' | 'rows'> & { checked: Set<CmsTableProps['rows'][0]>, setChecked: StateUpdater<Set<CmsTableProps['rows'][0]>>}) {
	const isWide = useMedia('(min-width: 700px)')
	const cols = isWide ? p.cols : p.cols.slice(0, 1)
	const toggleChecks = useCallback(_toggleChecks, [])

	return <HeadTr>
		<td style={{ width: 24 }}><Checkbox name="select-all" checked={p.checked.size === p.rows.length} onClick={toggleChecks} /></td>
		{cols.map(c => <HeadCol colData={c} />)}
	</HeadTr>

	function _toggleChecks() {
		p.setChecked(checked => new Set(checked.size === p.rows.length ? [] : p.rows))
	}
}
const HeadTr = styled.tr`
	:root td.clickable
		cursor: pointer
	:root td.clickable:hover a
		text-decoration: underline
	:root td:first-of-type svg.empty
		fill: var(--gray5)
	:root td:not(:first-of-type) svg
		visibility: hidden
	:root td:not(:first-of-type):hover svg,
	:root td:not(:first-of-type).active svg
		visibility: visible
	:root td.clickable:active svg
		transform: translateY(2px)
`

const carrotProps = { size: 20, style: { marginBottom: -4, marginTop: -4, color: 'var(--black)' } }
function HeadCol({ colData: c }: { colData: CmsTableProps['cols'][0] }) {
	const q = qs.parse()
	const sortCurrent = (
		q.sortBy === c.title && q.sortDirection
		|| !q.sortBy && c.sortDefault
	)

	const carrot = c.sortable && (
		sortCurrent === 'asc' && <i.CarrotDown {...carrotProps} />
		|| sortCurrent === 'desc' && <i.CarrotUp {...carrotProps} />
		|| c.sortDefault === 'asc' && <i.CarrotDown {...carrotProps} />
		|| c.sortDefault === 'desc' && <i.CarrotUp {...carrotProps} />
		|| <i.CarrotDown {...carrotProps} />
	)
	
	const sort = useCallback(() => {
		const sortDirection = (
			sortCurrent && (sortCurrent === 'asc' ? 'desc' : 'asc')
			|| c.sortDefault
			|| 'asc'
		)
		nav(qs.create({ sortBy: c.title, sortDirection }, { upsert: true }), {replace: true})
	}, [sortCurrent])

	return <td onClick={sort} class={`${c.sortable ? 'clickable' : ''} ${sortCurrent ? 'active' : ''}`}>
		{c.sortable
			? <a href="#table-sort">{c.title} {carrot}</a>
			: <span>{c.title} {carrot}</span>
		}
	</td>
}

function BodyRow(p: Pick<CmsTableProps, 'cols'> & { row: CmsTableProps['rows'][0], checked: Set<CmsTableProps['rows'][0]>, setChecked: StateUpdater<Set<CmsTableProps['rows'][0]>>}) {
	const isWide = useMedia('(min-width: 700px)')
	return <tr>
		<td><RowCheckbox {...p} /></td>
		{isWide
			? p.row.map((col, i) => <td class={i === 0 ? 'bold' : ''}>{col}</td>)
			: <td>
				{p.cols.map((col, i) => i === 0
					? <div>
						<div><b>{p.row[i]}</b></div>
						<div style={{ margin: '-.4rem 0 .4rem' }}>_ _ _</div>
					</div>
					: <div>{col.title}: {p.row[i]}</div>
				)}
			</td>
		}
	</tr>
}

function RowCheckbox(p: { row: CmsTableProps['rows'][0], checked: Set<CmsTableProps['rows'][0]>, setChecked: StateUpdater<Set<CmsTableProps['rows'][0]>> }) {
	const onClick = useCallback(_onClick, [])
	return <Checkbox name="row-selected" checked={p.checked.has(p.row)} onClick={onClick} />

	function _onClick() {
		p.setChecked((last: typeof p.checked) => {
			if (last.has(p.row))
				last.delete(p.row)
			else
				last.add(p.row)
			return new Set([...last])
		})
	}
}


