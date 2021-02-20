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
	:root
		position: absolute
		top: 0
		left: 0
		right: 0
		bottom: 0
		background-color: hsl(var(--primary-h),var(--primary-s),70%)
		background-image: url("/fabric.png")
		overflow-x: hidden
		overflow-y: auto
	@media (max-width: 700px)
		:root
			background-color: hsl(var(--primary-h),var(--primary-s),88%)
`
const LoginLayoutInner = styled.div`
	:root
		z-index: 1
		position: relative
		top: 10vh
		margin: auto
		width: 280px
		max-width: 100%
		background:  var(--white)
		padding: 20px 40px 40px
		border-radius: 10px
	@media (max-width: 700px)
		:root
			background: none
`