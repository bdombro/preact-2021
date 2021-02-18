/* eslint-disable max-len */
/**
 * Adapted from https://codepen.io/5t3ph/pen/RwrOygP
 */
import EmptyPath from 'mdi-paths-split/CheckboxBlankOutline'
import MarkedPath from 'mdi-paths-split/CheckboxMarked'
import {h} from 'preact'

import { IconSvg } from '~/lib/icons'
import styled from '~/lib/styled'

export default function Checkbox(p: {name: string, checked: boolean, onClick?: () => any}) {
	return <CheckboxDiv class={p.checked ? 'checked' : ''}>
		<IconSvg fill="var(--gray6)" class="marked" path={MarkedPath} />
		<IconSvg fill="var(--gray4)" class="empty" path={EmptyPath} />
		<input type="checkbox" aria-label={p.name} {...p} />
	</CheckboxDiv>
}

const CheckboxDiv = styled.div`
  :root
    position: relative
    margin-top: -2px
    margin-bottom: -8px
  :root input
    opacity: 0
  :root svg
    position: absolute
    top: 0
    left: 0
  :root.checked .marked
    display: initial
  :root:not(.checked) .marked
    display: none
  :root.checked .empty
    display: none
  :root:not(.checked) .empty
    display: initial
`
