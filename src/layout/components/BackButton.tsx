import {h} from 'preact'

import { ArrowL } from '~/lib/icons'
import styled from '~/lib/styled'

export default function BackButton() {
	return <BackButtonA title="Go Back" href="#stack-back">
		<ArrowL size={18} />
	</BackButtonA>
}
const BackButtonA = styled.a`
	:root
		position: relative
		display: inline-block
		top: 1px
		color: var(--gray7)
		border-radius: 30px
		padding: 4px 2px 2px 6px
		margin-right: 3px
		width: 30px
	:root:hover
		background: var(--gray3)
	:root:active
		transform: translateY(2px)
`