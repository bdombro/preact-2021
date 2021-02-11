import {h} from 'preact'

import { ArrowL } from '~/lib/icons'
import styled from '~/lib/styled'

export default function BackButton() {
	return <BackButtonA href="#stack-back">
		<ArrowL size={22} />
	</BackButtonA>
}
const BackButtonA = styled.a`
	:root
		position: relative
		top: 1px
		color: var(--gray7)
		border-radius: 20px
		padding: 2px
		margin-right: 3px
	:root:hover
		background: var(--gray3)
	:root:active
		transform: translateY(2px)
	:root svg
		height: 18px
		overflow: hidden
`