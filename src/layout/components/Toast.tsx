import {ComponentChildren, h} from 'preact'
import { useEffect, useLayoutEffect, useRef } from 'preact/hooks'

import { ToastCtx } from '~/App.context'
import * as i from '~/lib/icons'
import styled from '~/lib/styled'

const timeouts = new Set<any>()

export function ToastFromContext() {
	const [ctx] = ToastCtx.use()
	return <Toast {...ctx} />
}

export interface ToastProps {
	location: 'right' | 'bottom' | 'center',
	message: ComponentChildren,
	duration?: number,
	icon?: 'success' | 'warning' | 'error' | i.IconComponentType,
	iconSize?: number
}
export default function Toast(p: ToastProps) {
	const ref = useRef<any>(null)

	let Icon = p.icon!
	if (Icon === 'success') Icon = i.Success
	if (Icon === 'warning') Icon = i.Alert
	if (Icon === 'error') Icon = i.Error
	
	useLayoutEffect(reset, [p])
	useEffect(init, [p])

	return <ToastOuter class={`${p.location} hidden ${typeof p.icon === 'string' ? p.icon : ''}`} ref={ref}>
		<div>
			<div class={p.icon ? 'withIcon' : ''}>
				{!!p.icon && <div><Icon size={p.iconSize ?? 40} /></div>}
				{p.message}
			</div>
		</div>
	</ToastOuter>

	function reset() {
		ref.current.base.classList.remove('animatedIn')
		ref.current.base.classList.remove('animatedOut')
		ref.current.base.style.display = 'none'
		if (p.location === 'right')
			ref.current.base.classList.add('hidden')
		if (timeouts.size) {
			timeouts.forEach(t => clearTimeout(t))
			timeouts.clear()
		}
	}
	function init() {
		if (p.message) {
			ref.current.base.style.display = 'initial'
			ref.current.base.classList.add('animatedIn')
			ref.current.base.classList.remove('hidden')
			if (!p.duration) p.duration = 2e3
			if (p.duration === -1) return
			timeouts.add(setTimeout(function selfDestruct() {
				ref.current.base.classList.remove('animatedIn')
				ref.current.base.classList.add('animatedOut')
				ref.current.base.classList.add('hidden')
				timeouts.add(setTimeout(() => {
					ref.current.base.classList.remove('animatedOut')
					ref.current.base.style.display = 'none'
				}, 450))
			}, p.duration))
		}
	}
}


const ToastOuter = styled.div`
	:root
		position:absolute
		z-index:100
	:root.animatedIn
		transition: right .06s linear
	:root.animatedOut
		transition: bottom .3s linear, right .2s linear, opacity .4s linear
	:root.bottom
		bottom: 10px
		left:0
		width:100%
		text-align:center
	:root.bottom.hidden
		bottom: -100px
	:root.right
		top: 60px
		right:10px
		border-radius: 6px
	:root.right.hidden
		right: -330px
	:root.center
		top: 150px
		left:0
		width:100%
		text-align:center
	:root.center.hidden
		opacity: 0
	:root>div
		max-width: 330px
		padding: 15px 20px
		background:var(--primary)
		display:inline-block
		color:#fff
		border-radius: 6px
	:root.center>div,
	:root.bottom>div
		min-width: 230px
	:root.success>div
		background: var(--success)
	:root.warning>div
		background: var(--warning)
	:root.error>div
		background: var(--danger)
	:root a, :root a:active
		color: white
		text-decoration: underline
	:root a:active
		text-decoration: none
	:root>div>div.withIcon
		display: flex
		flex-direction: row
		align-items: center
		text-align: left
	:root>div>div.withIcon>div
		margin-right: 16px
	
`