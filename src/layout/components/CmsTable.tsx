import { ComponentChildren, Fragment, FunctionalComponent, h } from 'preact'
import { useState } from 'preact/hooks'

import { ToastCtx } from '~/App.context'
import * as i from '~/lib/icons'
import qs from '~/lib/queryStrings'
import { nav } from '~/lib/router'
import styled from '~/lib/styled'
import useMedia from '~/lib/useMedia'

import Checkbox from './Checkbox'

export default function CmsTable(p: {
  cols: { title: string, sortable?: boolean, sortDefault?: 'asc' | 'desc' }[],
  categories?: { title: string, count: number }[],
  bulkOptions?: { title: string, cb: (selection: any[]) => any }[],
  pages: number,
  total: number,
  rows: (ComponentChildren)[][],
}) {
	const q = qs.parse()
	const [action, setAction] = useState('-1')
	const [checked, setChecked] = useState<Set<any>>(new Set())
	const isWide = useMedia('(min-width: 600px)')

	return <CmsTableDiv>
		<TableFilterDiv>
			<CategoryFilters />
			<SearchForm />
		</TableFilterDiv>
		<HeaderFooter />
		<table>
			<thead>
				<HeadRow />
			</thead>
			<tbody>
				{p.rows.map(row => <BodyRow row={row} />)}
			</tbody>
			<tfoot>
				<HeadRow />
			</tfoot>
		</table>
		<HeaderFooter isFooter />
	</CmsTableDiv>

	function SearchForm() {
		return <SearchFormForm onSubmit={onSubmit}>
			<input name='search' value={q.search} />
			<button>Search Users</button>
		</SearchFormForm>

		function onSubmit(e: any) {
			const next = new FormData(e.target).get('search')
			if (next === (q.search || ''))
				ToastCtx.set({ message: 'Search query hasn\'t changed', icon: 'error', location: 'bottom'})
			else
				nav(qs.create({ search: next }, { upsert: true }))
		}
	}
	function CategoryFilters() {
		if (!p.categories?.length) return <CategoryFilterDiv>&nbsp;</CategoryFilterDiv>
		const categories = p.categories!
		const { category = categories[0].title } = q
		return <CategoryFilterDiv>
			{p.categories.map((c, i) => c.title === category
				? <span><b>{c.title}</b> ({c.count}){i < categories.length - 1 && ' | '}</span>
				: <span><a href={createUri(c.title)}>{c.title}</a> ({c.count}){i < categories.length - 1 && ' | '}</span>
			)}
		</CategoryFilterDiv>
		function createUri(next: string) {
			return qs.create({ category: next !== categories[0].title ? next : null }, { upsert: true }) || location.pathname
		}
	}
	function HeaderFooter({isFooter = false}) {
		const { page = '1' } = q
		const pageInt = parseInt(page, 10)
		return <HeaderFooterDiv class={isFooter ? 'footer' : ''}>
			<BulkActionsForm />
			<CountDiv>
				<div>{p.total} items&nbsp;</div>
				{p.pages > 1 && <Fragment>
					<PageButton pageTo={1}>«</PageButton>
					<PageButton pageTo={pageInt - 1}>‹</PageButton>
					<div>&nbsp;{page} of {p.pages}&nbsp;</div>
					<PageButton pageTo={pageInt + 1}>›</PageButton>
					<PageButton pageTo={p.pages}>»</PageButton>
				</Fragment>}
			</CountDiv>
		</HeaderFooterDiv>
		function PageButton({ pageTo, children }: { pageTo: number, children: ComponentChildren }) {
			if (pageTo < 1) pageTo = 1
			if (pageTo > p.pages) pageTo = p.pages
			return <a class={`button ${pageTo === pageInt ? 'disabled' : ''}`}
				onClick={(e: any) => {
					if (pageTo === pageInt) {
						e.preventDefault()
						ToastCtx.set({ message: `You're already on the ${pageTo === 1 ? 'first' : 'last'} page`, icon: 'error', location: 'bottom' })
					}
				}}
				href={qs.create({ page: pageTo !== 1 ? pageTo : null }, { upsert: true }) || location.pathname}>
				{children}
			</a>
		}
		function BulkActionsForm() {
			return <BulkActionsFormDiv>
				<select name="action" value={action} onChange={(e: any) => setAction(e.target.value)}>
					<option value="-1">Bulk Actions</option>
					{p.bulkOptions?.map(o => <option value={o.title}>{o.title}</option>)}
				</select>
				<button onClick={onClick}>Apply</button>
			</BulkActionsFormDiv>

			function onClick() {
				if (action === '-1') return ToastCtx.set({ message: 'No action selected', icon: 'error', location: 'bottom' })
				if (!checked.size) return ToastCtx.set({ message: 'No rows selected', icon: 'error', location: 'bottom' })
				p.bulkOptions?.find(o => o.title === action)!.cb([...checked])
				setChecked(new Set())
			}
		}
	}
	function HeadRow() {
		const carrotProps = { size: 20, style: { marginBottom: -4, marginTop: -4, color: 'var(--black)' } }
		const { sortBy, sortDirection } = q
		const cols = isWide ? p.cols : p.cols.slice(0, 1)

		return <HeadTr>
			<td style={{ width: 24 }}><Checkbox name="select-all" checked={checked.size === p.rows.length} onClick={toggleChecks} /></td>
			{cols.map(c => <HeadCol colData={c} />)}
		</HeadTr>

		function toggleChecks() {
			setChecked(new Set(checked.size === p.rows.length ? [] : p.rows))
		}

		function HeadCol({ colData: c }: { colData: typeof p.cols[0] }) {
			const sortCurrent = (
				sortBy === c.title && sortDirection
        || !sortBy && c.sortDefault
			)

			const carrot = c.sortable && (
				sortCurrent === 'asc' && <i.CarrotDown {...carrotProps} />
        || sortCurrent === 'desc' && <i.CarrotUp {...carrotProps} />
        || c.sortDefault === 'asc' && <i.CarrotDown {...carrotProps} />
        || c.sortDefault === 'desc' && <i.CarrotUp {...carrotProps} />
        || <i.CarrotDown {...carrotProps} />
			)
			return <td onClick={sort} class={`${c.sortable ? 'clickable' : ''} ${sortCurrent ? 'active' : ''}`}>
				{c.sortable
					? <a href="#table-sort" onClick={sort}>{c.title} {carrot}</a>
					: <span>{c.title} {carrot}</span>
				}
			</td>

			function sort() {
				const sortDirection = (
					sortCurrent && (sortCurrent === 'asc' ? 'desc' : 'asc')
          || c.sortDefault
          || 'asc'
				)
				nav(qs.create({ sortBy: c.title, sortDirection }, { upsert: true }))
			}
		}
	}
	function BodyRow({ row }: {row: typeof p.rows[0]}) {
		return <tr>
			<td><RowCheckbox row={row} /></td>
			{isWide
				? row.map((col,i) => <td class={i === 0 ? 'bold' : ''}>{col}</td>)
				: <td>
					{p.cols.map((col, i) => i === 0
						? <div>
							<div><b>{row[i]}</b></div>
							<div style={{margin: '-.4rem 0 .4rem'}}>_ _ _</div>
						</div>
						: <div>{col.title}: {row[i]}</div>
					)}
				</td>
			}
		</tr>
	}
	function RowCheckbox({ row }: { row: typeof p.rows[0] }) {
		return <Checkbox name="row-selected" checked={checked.has(row)} onClick={() => {
			setChecked(last => {
				if (last.has(row))
					last.delete(row)
				else
					last.add(row)
				return new Set([...last])
			})
		}} />
	}
}

const CmsTableDiv = styled.div`
	:root
		display: block
`

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
const TableFilterDiv = styled.div`
	:root
		position: relative
		margin-bottom: .3rem
		display: flex
		flex-direction: row
		justify-content: space-between
		align-items: center
	@media (max-width: 600px)
		:root
			display: block
`
const CategoryFilterDiv = styled.div`
	:root
		font-size: .9rem
		margin-bottom: .3rem
`
const SearchFormForm = styled.form`
	:root
		display: flex
		flex-direction: row
		align-items: center
`

const HeaderFooterDiv = styled.div`
	:root
		display: flex
		flex-direction: row
		justify-content: space-between
	@media (max-width: 600px)
		:root
			flex-direction: column-reverse
		:root.footer
			flex-direction: column
`
const BulkActionsFormDiv = styled.div`
	:root
		display: flex
		flex-direction: row
		align-items: center
		margin-bottom: .3rem

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
