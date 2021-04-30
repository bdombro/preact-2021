import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import { navListener } from '~/lib/router'

import actionAsyncDispatchMiddleware from './actionAsyncDispatchMiddleware'
import * as counter from './modules/counter'
import * as sidebarRight from './modules/sidebarRight'
import * as theme from './modules/theme'

export {counter, sidebarRight}



export const store = configureStore({
	reducer: {
		counter: counter.slice.reducer,
		sidebarRight: sidebarRight.slice.reducer,
		theme: theme.slice.reducer,
	},
	middleware: (getDefaultMiddleware) => [
		...getDefaultMiddleware(),
		actionAsyncDispatchMiddleware,
	]
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,RootState,unknown,Action<string>>

// Global Event Listeners
navListener(() => store.dispatch(sidebarRight.set(true)))
window.addEventListener('#theme-toggle', () => store.dispatch(theme.toggle()))

let last = store.getState()
store.subscribe(function globalSubscribers() {
	const state = store.getState()

	console.log(last.counter.value)
	console.log(state.counter.value)

	// if (state.counter.value !== last.counter.value) {
	// 	store.dispatch(sidebarRight.set(true))
	// }

	last = state
})