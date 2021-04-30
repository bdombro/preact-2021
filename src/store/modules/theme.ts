import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '..'
import * as sidebarRight from './sidebarRight'

export const slice = createSlice({
	name: 'theme',
	initialState: {value: localStorage.getItem('theme') === 'dark' ? 'dark' : 'light' as 'light' | 'dark'},
	reducers: {
		set(state, action: PayloadAction<'light' | 'dark'>) {
			state.value = action.payload
			localStorage.setItem('theme', state.value)
			;(action as any).asyncDispatch(sidebarRight.set(false))
		},
		toggle(state, action:  PayloadAction<undefined>) {
			state.value = state.value === 'light' ? 'dark' : 'light'
			localStorage.setItem('theme', state.value)
			;(action as any).asyncDispatch(sidebarRight.set(false))
		},
	},
})
export const { set, toggle } = slice.actions
export const selector = (state: RootState) => state.counter.value

