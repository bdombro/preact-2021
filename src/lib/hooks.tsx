/**
 * A hook that watches a css media breakpoint
 */
import { useCallback, useEffect, useReducer, useRef,useState } from 'preact/hooks'
export { useCallback, useEffect, useReducer, useRef, useState }

/**
 * useFirstMountState: check if current render is first.
 * from react-use
 */
export function useFirstMountState(): boolean {
	const isFirst = useRef(true)
	if (isFirst.current) {
		isFirst.current = false
		return true
	}
	return isFirst.current
}

/**
 * useMountedState: returns a fcn that returns true if component is mounted.
 * from react-use
 */
export function useMountedState() {
	const isMountedRef = useRef(true)
	const isMounted = useCallback(() => isMountedRef.current, [])
	useEffect(() => {
		isMountedRef.current = true
		return () => { isMountedRef.current = false }
	}, [])
	return isMounted
}

/**
 * useMedia: use the @media handler from css
 * from react-use
 */
export function useMedia(query: string) {
	const [state, setState] = useState(window.matchMedia(query).matches)
	useEffect(() => {
		let mounted = true
		const mql = window.matchMedia(query)
		const onChange = () => mounted && setState(!!mql.matches)

		mql.addListener(onChange)
		setState(mql.matches)

		return () => {
			mounted = false
			mql.removeListener(onChange)
		}
	}, [query])
	return state
}

/**
 * useUpdateEffect: run an effect only on updates.
 * from react-use
 */
export const useUpdateEffect: typeof useEffect = (effect, deps) => {
	const isFirstMount = useFirstMountState()
	useEffect(() => {
		if (!isFirstMount) {
			return effect()
		}
	}, deps)
}

