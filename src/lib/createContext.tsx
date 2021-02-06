/**
 * A factory for creating enhanced react-style "context"
 * 
 * In comparison to react's context, it provides methods to access/mutate/subscribe
 * to context outside of components and without hooks. This is really nice if you are
 * optimizing the performance of your app to avoid unnecessary rendors, and also can
 * enable some really cool, otherwise impossible functionality.
 * 
 */
import { ComponentChildren, createContext as createContextP, h } from 'preact'
import { StateUpdater, useContext as useContextP, useEffect, useRef, useState as useStateP } from 'preact/hooks'

export function createContext<T>(defaultVal: T) {
	const defaultState: [T, StateUpdater<T>] = [defaultVal, () => false]

	const ctx = {
		use, 
		Provider, 
		Context: createContextP(defaultState), 
		get: getterUnInitialized as () => T, 
		set: setterUnInitialized as StateUpdater<T>, 
		subscribe, 
		subscribers: new Set<(next: T) => any>(),
		isReady: false,
	}
	return ctx

	function Provider({ children }: {children: ComponentChildren}) {
		const state = useStateP<T>(defaultVal)
		const skipNotify = useRef(true)
		useEffect(notifySubscribers, [state])
		useEffect(resetOnDismount, [])
		
		ctx.get = () => state[0]
		ctx.set = state[1]
		ctx.isReady = true

		return <ctx.Context.Provider value={state}>{children}</ctx.Context.Provider>

		function notifySubscribers() {
			if (skipNotify.current) skipNotify.current = false
			else ctx.subscribers.forEach(s => s(state[0]))
		}
		function resetOnDismount() {
			return () => {
				ctx.get = getterUnInitialized
				ctx.set = setterUnInitialized
				ctx.isReady = false
			}
		}
	}

	function use () { return useContextP(ctx.Context) }
  
	function subscribe(callback: (next: T) => any) {
		ctx.subscribers.add(callback)
		return () => ctx.subscribers.delete(callback)
	}
}
const getterUnInitialized = () => { throw new Error('Context not initialized') }
const setterUnInitialized = () => { throw new Error('Context not initialized') }


