import { h } from 'preact'
import { useDispatch,useSelector } from 'react-redux'

import PaddedPage from '~/layout/components/PaddedPage'
import Section from '~/layout/components/Section'
import type { RouteType } from '~/lib/router'

import {
	counter,
	store
} from '../store'

const {
	decrement,
	increment,
	incrementAsync,
	incrementByAmount,
	selector,
} = counter

const styles: any = {}

export default function Counter({ route }: { route: RouteType }) {
	const count = useSelector(selector)
	const dispatch = useDispatch()

	// count.

	return (
		<PaddedPage>
			<Section header1={route.title} backButton={route.hasBack}>
				<div>
					<button aria-label="Increment value" onClick={() => dispatch(increment())}>
          +
					</button>
					<span>{count}</span>
					<button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          -
					</button>
				</div>
				<div>
					<button onClick={() =>dispatch(incrementByAmount(1))}>
          Add 1 by Amount
					</button>
					<button onClick={() => dispatch(incrementAsync(1))}>
          Add 1 by Async
					</button>
					<button onClick={() => store.dispatch(incrementAsync(1))}>
          Add 1 without react-redux
					</button>
				</div>
			</Section>
		</PaddedPage>
	)
}
