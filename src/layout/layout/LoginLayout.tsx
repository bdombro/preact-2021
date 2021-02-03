import { h } from 'preact'

import styled from '~/lib/styled'

export default function LoginLayout({children}: any) {
	return <LoginLayoutOuter>
		<LoginLayoutInner>
			{children}
		</LoginLayoutInner>
	</LoginLayoutOuter>
}
const LoginLayoutOuter = styled.div`
	:root {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: hsl(var(--primary-h), var(--primary-s), 30%);
    overflow-x: hidden;
    overflow-y: auto;
    padding: 10px;
	}
`
const LoginLayoutInner = styled.div`
	:root {
			position: relative;
			top: 10vh;
			margin: auto;
			width: 340px;
			max-width: 100%;
			background:  var(--body);
			color: var(--text);
			padding: 20px 40px;
			border-radius: 10px;
			box-sizing: border-box;
	}
	@media (max-width: 600px) {
			:root {
					top: 5vh;
			}
	}
`