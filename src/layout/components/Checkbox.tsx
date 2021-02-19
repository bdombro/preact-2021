/* eslint-disable max-len */
/**
 * Adapted from https://codepen.io/5t3ph/pen/RwrOygP
 */
import EmptyPath from 'mdi-paths-split/CheckboxBlankOutline'
import MarkedPath from 'mdi-paths-split/CheckboxMarked'
import {h} from 'preact'

import { useCallback, useState, useUpdateEffect } from '~/lib/hooks'
import { IconSvg } from '~/lib/icons'
import styled from '~/lib/styled'

interface CheckboxProps {
	divProps?: h.JSX.HTMLAttributes < HTMLDivElement >
	inputProps: Omit<h.JSX.HTMLAttributes<HTMLInputElement>, 'name'> & { name: string, 'aria-label': string }
}
export default function Checkbox({divProps = {}, inputProps}: CheckboxProps) {
	const [checked, setChecked] = useState(inputProps.checked || inputProps.default || false)
	useUpdateEffect(function _pullDown() { setChecked(inputProps.checked || false) }, [inputProps.checked])
	const onClick = useCallback(_onClick, [])
	return (
		<CheckboxDiv {...divProps} data-checked={checked}>
			<IconSvg fill="var(--gray6)" class="marked" path={MarkedPath} />
			<IconSvg fill="var(--gray4)" class="empty" path={EmptyPath} />
			<input type="checkbox" {...inputProps} checked={checked} onClick={onClick} />
		</CheckboxDiv>
	)
	function _onClick(e: any) {
		setChecked(curr => !curr)
		if (inputProps.onClick) (inputProps as any).onClick(e)
	}
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
	:root .marked
		display: none
	:root .empty
		display: initial
	:root[data-checked="true"] .marked
		display: initial
	:root[data-checked="true"] .empty
		display: none
`
