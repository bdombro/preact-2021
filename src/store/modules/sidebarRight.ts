import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '..'

export const slice = createSlice({
	name: 'sidebarRight',
	initialState: {value: !!localStorage.getItem('sidebarRight')},
	reducers: {
		set(state, action: PayloadAction<boolean>) {
			state.value = action.payload
			localStorage.setItem('sidebarRight', action.payload ? '1' : '')
		},
	},
})
export const { set } = slice.actions
export const selector = (state: RootState) => state.counter.value
