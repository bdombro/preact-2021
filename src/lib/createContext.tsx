import { ComponentChildren, createContext as createContextP, h } from 'preact'
import { StateUpdater, useContext as useContextP, useEffect, useRef, useState as useStateP } from 'preact/hooks'

export function createContext<T>(defaultVal: T) {
	const defaultState: [T, StateUpdater<T>] = [defaultVal, () => false]

	const ctx = {
		use, 
		Provider, 
		context: createContextP(defaultState), 
		get: getterUnInitialized as () => T, 
		set: setterUnInitialized as StateUpdater<T>, 
		subscribe, 
		subscribers: new Set<(next: T) => any>()
	}
	return ctx

	function Provider({ children }: {children: ComponentChildren}) {
		const state = useStateP<T>(defaultVal)
		const skipNotify = useRef(true)
		useEffect(notifySubscribers, [state])
		useEffect(resetOnDismount, [])
		return <ctx.context.Provider value={state}>{children}</ctx.context.Provider>

		function notifySubscribers() {
			if (skipNotify.current) skipNotify.current = false
			else ctx.subscribers.forEach(s => s(state[0]))
			ctx.get = () => state[0]
			ctx.set = state[1]
		}
		function resetOnDismount() {
			return () => {
				ctx.get = getterUnInitialized
				ctx.set = setterUnInitialized
			}
		}
	}

	function use () { return useContextP(ctx.context) }
  
	function subscribe(callback: (next: T) => any) {
		ctx.subscribers.add(callback)
		return () => ctx.subscribers.delete(callback)
	}
}
const getterUnInitialized = () => { throw new Error('Context not initialized') }
const setterUnInitialized = () => { throw new Error('Context not initialized') }

