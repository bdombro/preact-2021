import {ComponentChildren, h} from 'preact'

import styled from '~/lib/styled'

export default function Section(p: { header1?: ComponentChildren, header2?: ComponentChildren, children: ComponentChildren}) {
	return <SectionDiv>
		{!!p.header1 && <div class='top'>
			<h2 class='header1'>{p.header1}</h2>
			{!!p.header2 && <h4 class='header2'>{p.header2}</h4>}
		</div>}
		<div class='bottom'>{p.children}</div>
	</SectionDiv>
}

const SectionDiv = styled.div`
	:root
		background: var(--white)
		margin-bottom: 10px
		border-radius: 8px
	:root>.top
		padding: 6px 0 0 20px
		border-bottom: 1px solid var(--gray4)
	:root>.top>.header2
		margin-top: -.8rem
		font-size: 1rem
		color: var(--gray9)
	:root>.bottom
		padding: 20px 20px 30px
	@media (max-width: 700px)
		:root
			margin: 10px
`