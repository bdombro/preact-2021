import { h } from 'preact'

import styled from '~/lib/styled'

import ContentDiv from '../components/ContentDiv'

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