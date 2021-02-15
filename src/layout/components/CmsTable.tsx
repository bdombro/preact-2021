import { ComponentChildren, h } from 'preact'
import { useState } from 'preact/hooks'

import { ToastCtx } from '~/App.context'
import * as i from '~/lib/icons'
import qs from '~/lib/queryStrings'
import { nav } from '~/lib/router'
import styled from '~/lib/styled'

export default function CmsTable(p: {
  cols: { title: string, sortable?: boolean, sortDefault?: 'asc' | 'desc' }[],
  categories?: { title: string, count: number }[],
  bulkOptions?: { title: string, cb: (selection: any[]) => any }[],
  pages: number,
  total: number,
  rows: any[][],
}) {
	const q = qs.parse()
	const [action, setAction] = useState('-1')
	const [checked, setChecked] = useState<Set<any>>(new Set())

	return <div style={{ color: 'var(--black)' }}>
		<TableFilterDiv>
			<SearchForm />
			<CategoryFilters />
		</TableFilterDiv>
		<Header />
		<table>
			<thead>
				<HeadRow />
			</thead>
			<tbody>
				{p.rows.map(row => <tr>
					<td><Checkbox row={row} /></td>
					{row.map(c => <td>{c}</td>)}
				</tr>)}
			</tbody>
			<tfoot>
				<HeadRow />
			</tfoot>
		</table>
		<Header />
	</div>

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
	function Header() {
		const { page = '1' } = q
		const pageInt = parseInt(page, 10)
		return <HeaderDiv>
			<BulkActionsForm />
			<CountDiv>
				{p.total} items
				{p.pages > 1 && <span>&nbsp;&nbsp;&nbsp;
					<PageButton pageTo={1}>«</PageButton>&nbsp;
					<PageButton pageTo={pageInt - 1}>‹</PageButton>&nbsp;
					&nbsp;{page} of {p.pages}&nbsp;&nbsp;
					<PageButton pageTo={pageInt + 1}>›</PageButton>&nbsp;
					<PageButton pageTo={p.pages}>»</PageButton>&nbsp;
				</span>}
			</CountDiv>
		</HeaderDiv>
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
				{children}</a>
		}
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
	function HeadRow() {
		const carrotProps = { size: 20, style: { marginBottom: -4, marginTop: -4, color: 'var(--black)' } }
		const { sortBy, sortDirection } = q

		return <HeadTr>
			<td style={{ width: 24 }}><input type="checkbox" checked={checked.size === p.rows.length} onClick={toggleChecks} /></td>
			{p.cols.map(c => <HeadCol colData={c} />)}
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
	function Checkbox({ row }: { row: any }) {
		return <input type="checkbox" checked={checked.has(row)} onClick={() => {
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

const HeadTr = styled.tr`
	:root td.clickable
		cursor: pointer
	:root td.clickable:hover a
		text-decoration: underline
	:root svg
		visibility: hidden
	:root td:hover svg,
	:root td.active svg
		visibility: visible
	:root td.clickable:active svg
		transform: translateY(2px)
	
`
const TableFilterDiv = styled.div`
	:root
		position: relative
		padding-bottom: .7rem
`
const CategoryFilterDiv = styled.div`
	:root
		font-size: .9rem
`
const SearchFormForm = styled.form`
	:root
		position: absolute
		right: 0
		top: -4px
`

const HeaderDiv = styled.div`
	:root
		position: relative
`
const BulkActionsFormDiv = styled.div`
	:root
		position: relative
		left: 0
		top: -4px
`
const CountDiv = styled.div`
	:root
		position: absolute
		top: 0
		right: 0
		font-size: .9rem
`
