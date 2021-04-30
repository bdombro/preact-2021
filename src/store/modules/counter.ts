import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppThunk, RootState } from '..'
import * as sidebarRight from './sidebarRight'


export const slice = createSlice({
	name: 'counter',
	initialState: {value: 0},
	reducers: {
		increment(state) {
			state.value += 1
		},
		decrement(state) {
			state.value -= 1
		},
		incrementByAmount(state, action: PayloadAction<number>) {
			state.value += action.payload
			// resetSidebarRight(action)
		},
	},
})

// function resetSidebarRight(payloadAction: any) {
// 	payloadAction.asyncDispatch(sidebarRight.set(true))
// }

export const { increment, decrement, incrementByAmount } = slice.actions

export const incrementAsync = (amount: number): AppThunk => async dispatch => {
	dispatch(incrementByAmount(amount))
}

export const selector = (state: RootState) => state.counter.value