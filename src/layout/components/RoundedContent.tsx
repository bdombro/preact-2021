import { ComponentChildren, h } from 'preact'

import { useMedia } from '~/lib/hooks'
import { Content } from '~/lib/router'
import styled from '~/lib/styled'

import * as i from '../../lib/icons'


export default function RoundedContent(p: { children: ComponentChildren, withSidebar?: boolean }) {
	const isWide = useMedia('(min-width: 700px)')
	const cornerSize = 10
	return isWide 
		? <ContentDiv id="content" data-withSidebar={p.withSidebar} data-isWide={isWide}>
			{p.children}
			<div class='frame'>
				<div class='topBumper' />
				<i.RoundedCornerInv class="corner1" size={cornerSize} />
				<i.RoundedCornerInv class="corner2" size={cornerSize} horizontal />
				<i.RoundedCornerInv class="corner3" size={cornerSize} vertical />
				<i.RoundedCornerInv class="corner4" size={cornerSize} vertical horizontal />
				<div class='bottomBumper' />
			</div>
		</ContentDiv>
		: <Content {...p} />
}
const ContentDiv = styled.div`
	:root
		--content-height: var(--body-height)
		--content-right: var(--scrollbar-width)
		--content-right-padding: 10px
		--content-inner-right: calc( var(--content-right) + var(--content-right-padding) )
		--content-bottom: 0px
		--content-bottom-padding: 20px
		--content-inner-bottom: calc( var(--content-bottom) + var(--content-bottom-padding) )
		--content-background: var(--sidebar-background)
		--content-top: var(--header-height)
		--content-top-padding: 10px
		--content-inner-top: calc( var(--content-top) + var(--content-top-padding) )
		--content-left: 0px
		--content-left-padding: 10px
		--content-inner-left: calc( var(--content-left) + var(--content-left-padding) )
		--content-inner-height: calc( var(--content-height) - var(--content-bottom-padding) )
	:root[data-withSidebar="true"]
		--content-left: var(--sidebar-width)
		--content-left-padding: 0px
		--content-inner-left: calc( var(--content-left) + var(--content-left-padding) )
	:root
		position: relative
		background: var(--content-background)
		height: var(--content-height)
		overflow: hidden scroll
		z-index: 0
		padding-right: var(--content-right-padding)
		padding-bottom: var(--content-bottom-padding)
		padding-left: var(--content-left-padding)
	:root>.frame
		color: var(--content-background)
	:root>.frame>.topBumper
		position: fixed
		top: var(--content-top)
		left: var(--content-left)
		right: var(--content-inner-right)
		height: var(--content-top-padding)
		background: currentColor
	:root>.frame>.bottomBumper
		position: fixed
		bottom: var(--content-bottom)
		left: var(--content-left)
		right: var(--content-inner-right)
		height: var(--content-bottom-padding)
		background: currentColor
	:root>.frame>.corner1
		position: fixed
		top: var(--content-inner-top)
		left: var(--content-inner-left)
	:root>.frame>.corner2
		position: fixed
		top: var(--content-inner-top)
		right: var(--content-inner-right)
	:root>.frame>.corner3
		position: fixed
		bottom: var(--content-inner-bottom)
		left: var(--content-inner-left)
	:root>.frame>.corner4
		position: fixed
		bottom: var(--content-inner-bottom)
		right: var(--content-inner-right)
`