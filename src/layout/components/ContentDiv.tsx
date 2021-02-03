import { ComponentChildren,h } from 'preact'

import styled from '~/lib/styled'

const Div = styled.div`
	:root {
		visibility: hidden; /* hide until Route or Stack unhides */
		height: 100vh;
		height: var(--body-height);
		overflow-x: hidden;
		overflow-y: auto;
	}
`
export default function ContentDiv(props: {children: ComponentChildren}) {
	return <Div id="content" {...props}/>
}