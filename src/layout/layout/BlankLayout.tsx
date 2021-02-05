import { h } from 'preact'

import { ContentDiv } from '~/lib/router'
import styled from '~/lib/styled'

export default function BlankLayout({ children }: { children: any }) {
	return <BlankLayoutDiv>
		<ContentDiv>
			{children}
		</ContentDiv>
	</BlankLayoutDiv>
}
const BlankLayoutDiv = styled.div`
	:root {
		--body-height: 100vh;
		background: var(--body);
		overflow: hidden;
	}
`