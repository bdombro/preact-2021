import {h} from 'preact'

import { ArrowL } from '~/lib/icons'
import styled from '~/lib/styled'

export default function BackButton() {
	return <BackButtonA href="?stack=back">
		<ArrowL />
	</BackButtonA>
}
const BackButtonA = styled.a`
	:root
		position: absolute
		top: 5px
		left: 5px
		border-radius: 20px
		padding: 2px
	:root:hover
		background: var(--gray3)
`