import { ComponentChildren, Fragment as F, FunctionalComponent, h } from 'preact'
import { useEffect, useErrorBoundary, useLayoutEffect, useRef, useState } from 'preact/hooks'

import {AuthCtx, AuthCtxType} from '~/App.context'

import BlankLayout from '../layout/layout/BlankLayout'
import scrollListener from './scrollListener'


class ForbiddenError extends Error { type = 'Forbidden' }
class NotFoundError extends Error { type = 'NotFound' }


/**
 * RouterSwitch: Switches routes based on current url and also checks access control
 */
function RouterSwitch({ routesByPath }: RouterProps) {
	const [auth] = AuthCtx.use()
	const { pathname } = useLocation()
	const { Stack = RouteWrapper, Component=()=><F/>, hasAccess=()=>true } = routesByPath[pathname] || routesByPath['/notfound']
	if (!hasAccess(auth)) throw new ForbiddenError('Forbidden!')
	return <Stack><Component /></Stack>
}


/**
 * RouterComponent: Wraps the Router Switch in a Layout, and strategically only re-renders
 * the layout if the layout has changed, preserving state in the layouts
 * and improving performance
 */
interface RouterProps {
	routesByPath: Record<string, Route>,
}
interface Route {
	path: string
	Component: FunctionalComponent
	Layout?: FunctionalComponent
	Stack?: FunctionalComponent
	hasAccess?: (authCtx: AuthCtxType) => boolean
}
function RouterComponent(props: RouterProps) {
	const [Layout, setLayout] = useState<any>(() => BlankLayout)
	useLayoutEffect(watchLocation, [])
	const [error, resetError] = useErrorBoundary()
	if (error) {
		if (error instanceof ForbiddenError) {
			const R = props.routesByPath['/forbidden']
			const RLayout = R.Layout || BlankLayout
			return <RLayout><RouteWrapper><R.Component /></RouteWrapper></RLayout>
		}
		if (error instanceof NotFoundError) {
			const R = props.routesByPath['/notfound']
			const RLayout = R.Layout || BlankLayout
			return <RLayout><RouteWrapper><R.Component /></RouteWrapper></RLayout>
		}
		throw error
	}
	return <Layout><RouterSwitch {...props} /></Layout>

	function watchLocation() {
		onLocationChange()
		return navListener(onLocationChange)
	}
	function onLocationChange() {
		const match = props.routesByPath[location.pathname]

		// only update the layout if it's changed
		let Next = BlankLayout as any
		if (match && match.Layout)
			Next = match.Layout
		if (Layout !== Next)
			setLayout(() => Next)
		
		// Reset the errors if location changes, skipping the initial site load
		if (!RouterComponent.isFirstRender) resetError()
		RouterComponent.isFirstRender = false
	}
}
RouterComponent.isFirstRender = true


/**
 * RouteWrapper: Wrapper for routes to provide scroll tracking and restoration
 * on history.popstate
 */
const RouteHistory: Record<string, number> = {}
function RouteWrapper({ children }: any) {
	const _location = useLocation()
	useEffect(installListeners, [])
	useLayoutEffect(() => { ref.current.style.visibility = 'hidden' }, [_location])
	useEffect(recall, [_location])
	const ref = useRef<HTMLDivElement>(null)

	return <div style={{visibility: 'hidden'}} ref={ref}>{children}</div>

	function installListeners() {
		const e = document.getElementById('content')
		if (e) return scrollListener(e, updateScrollPos)
	}

	function updateScrollPos(scrollTop: number) {
		const uri = location.pathname + location.search
		RouteHistory[uri] = scrollTop
	}
	function recall() {
		const uri = location.pathname + location.search
		const e = document.getElementById('content')
		if (e) {
			if (RouteHistory[uri] && Date.now() - history.state > 3000)
				e.scrollTop = RouteHistory[uri]
			else {
				updateScrollPos(0)
				e.scrollTop = 0
			}
		}
		ref.current.style.visibility = 'visible'
	}
}


/**
 * StackFactory: A route wrapper factory to join a page to a route stack
 * and enhance stack-like-features
 */
type StackHistoryEntry = { location: UseLocationLocation, scroll: number }
type StackHistory = StackHistoryEntry[]
const StackHistories: Record<string, StackHistory> = {}
function StackFactory(basePath: string) {
	return function StackHandler({ children }: any) {
		const _location = useLocation()
		useLayoutEffect(() => { ref.current.style.visibility = 'hidden' }, [_location])
		useEffect(installListeners, [basePath, _location])
		const ref = useRef<HTMLDivElement>(null)

		return <div style={{ visibility: 'hidden' }} ref={ref}>{children}</div>

		function installListeners() {
			let cancelScrollListen: any = () => null
			const { pathname, search } = location
			const baseHistory = { location: { pathname: basePath + '/home', search: '' }, scroll: 0 }
			class Stack {
				static reset = () => { StackHistories[basePath] = [baseHistory]; return StackHistories[basePath][0] }
				static len = () => StackHistories[basePath]?.length ?? 0
				static top = () => StackHistories[basePath]?.[Stack.len() - 1] || Stack.reset()
				static pop = () => StackHistories[basePath].pop() || Stack.reset()
				static push = (entry: StackHistoryEntry) => StackHistories[basePath].push(entry)
			}
			const top = Stack.top()
			const arg = new URLSearchParams(search).get('stack')
			if (arg === 'reset') {
				Stack.reset()
				nav(basePath, { replace: true })
			}
			else if (arg === 'back') {
				Stack.pop()
				const back = Stack.top()
				nav(back.location.pathname + back.location.search, { replace: true })
			}
			else if (pathname === top.location.pathname && search === top.location.search) {
				console.log('top')
				scrollTo(top.scroll)
				ref.current.style.visibility = 'visible'
				const e = document.getElementById('content')
				if (e) cancelScrollListen = scrollListener(e, updateScrollPos)
			}
			else if (pathname === basePath) {// recall from stack
				nav(top.location.pathname + top.location.search, { replace: true })
			}
			else { // forward navigation -- add to history 
				console.log('forward')
				scrollTo(0)
				ref.current.style.visibility = 'visible'
				Stack.push({ location, scroll: 0 })
				const e = document.getElementById('content')
				if (e) cancelScrollListen = scrollListener(e, updateScrollPos)
			}

			return cancelScrollListen
		}

		function updateScrollPos(scrollTop: number) {
			StackHistories[basePath][StackHistories[basePath].length - 1].scroll = scrollTop
		}
		function scrollTo(to: number) {
			updateScrollPos(to)
			const e = document.getElementById('content')
			if (e) e.scrollTop = to
		}
	}
}

// PassThrough: A passthrough component
function PassThrough({ children }: any) {return children}

// Redirect: A component which immediately redirects elsewhere
function Redirect(to: string) {
	return function Redirect() {
		useLayoutEffect(() => nav(to, { replace: true }), [])
		return <div />
	}
}

function ContentDiv(props: { children: ComponentChildren }) {
	return <div id="content" style={{ height: 'var(--body-height)', overflow: 'hidden auto' }} {...props} />
}

/**
 * useLocation: A hook to watch location
 * Inspired by https://github.com/molefrog/wouter's useLocation hook
 */
interface UseLocationLocation { pathname: string, search: string }
function useLocation(): UseLocationLocation {
	const [location, setLocation] = useState<UseLocationLocation>(currentLocation)
	const prev = useRef(location)
	useEffect(_attachListeners, [])

	return location

	function _attachListeners() {
		// it's possible that an update has occurred between render and the effect handler,
		// so we run additional check on mount to catch these updates. Based on:
		// https://gist.github.com/bvaughn/e25397f70e8c65b0ae0d7c90b731b189
		checkForUpdates()
		return navListener(checkForUpdates)
	}

	// this function checks if the location has been changed since the
	// last render and updates the state only when needed.
	// unfortunately, we can't rely on `path` value here, since it can be stale,
	// that's why we store the last pathname in a ref.
	function checkForUpdates() {
		const next = currentLocation()
		if (prev.current.pathname !== next.pathname || prev.current.search !== next.search) {
			prev.current = next
			setLocation(next)
		}
	}
	function currentLocation() {
		return { pathname: window.location.pathname, search: window.location.search }
	}
}


// navListener: React to a change in navigation
function navListener(callback: () => any) {
	historyEvents.map((e) => addEventListener(e, callback))
	// callback()
	return function unListen() { historyEvents.map((e) => removeEventListener(e, callback)) }
}
const historyEvents = ['popstate', 'pushState', 'replaceState']


// nav: Helper to navigate to a new page
function nav(to: string, { replace = false } = {}) {
	history[replace ? 'replaceState' : 'pushState'](Date.now(), '', to)
}
if (!history.state) nav(location.pathname + location.search, { replace: true })


// Intercept changes to navigation to dispatch events and prevent default
interceptNavEvents()
function interceptNavEvents() {
	document.body.addEventListener('click', function linkIntercepter(e: any) {
		const ln = findLinkTagInParents(e.target) // aka linkNode

		if (ln?.host === window.location.host) {
			window.dispatchEvent(new Event('link-clicked'))
			e.preventDefault()

			if (ln.hash) window.dispatchEvent(new Event(ln.hash))

			if (ln.pathname + ln.search !== window.location.pathname + window.location.search) {
				if (ln.hash === '#replace')
					nav(ln.pathname + ln.search, { replace: true })
				else
					nav(ln.pathname + ln.search)
			} 
			else document.getElementById('content')!.scrollTop = 0
		}

		function findLinkTagInParents(node: HTMLElement): any {
			if (node?.nodeName === 'A') return node
			if (node?.parentNode) return findLinkTagInParents(node.parentElement!)
		}
	})
}



// While History API does have `popstate` event, the only
// proper way to listen to changes via `push/replaceState`
// is to monkey-patch these methods.
//
// See https://stackoverflow.com/a/4585031
monkeyPatchHistory()
function monkeyPatchHistory() {
	if (typeof history !== 'undefined') {
		for (const type of ['pushState', 'replaceState']) {
			const original = (history as any)[type]

					; (history as any)[type] = function (...props: any) {
				const result = original.apply(this, props)
				const event = new Event(type);
				(event as any).arguments = props

				dispatchEvent(event)
				return result
			}
		}
	}
}

export {
	ContentDiv,
	ForbiddenError,
	nav,
	navListener,
	NotFoundError,
	PassThrough,
	Redirect,
	RouterComponent,
	StackFactory,
	useLocation,
}