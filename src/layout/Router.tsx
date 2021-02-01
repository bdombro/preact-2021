import { FunctionalComponent, h } from 'preact'
import { useEffect, useLayoutEffect, useRef, useState } from 'preact/hooks'

import BlankLayout from './BlankLayout/BlankLayout'
import lazy from './lazy'
import scrollListener from './scrollListener'

const NotFound = lazy(() => import('./NotFound'))

function RouterSwitch({ routesByPath }: RouterProps) {
  const { pathname } = useLocation()
  const { Stack = RouteWrapper, Component = NotFound } = routesByPath[pathname] || {}
  return <Stack><Component /></Stack>
}


/**
 * Wraps the Router Switch in a Layout, and strategically only re-renders
 * the layout if the layout has changed, preserving state in the layouts
 * and improving performance
 */
export function RouterComponent(props: RouterProps) {
  const [Layout, setLayout] = useState<any>(() => BlankLayout)
  useLayoutEffect(watchLocation, [])
  return <Layout><RouterSwitch {...props} /></Layout>

  function watchLocation() {
    onLocationChange()
    return navListener(onLocationChange)
  }
  function onLocationChange() {
    const match = props.routesByPath[location.pathname]
    if (!match || !match.Layout) setLayout(() => BlankLayout)
    else if (Layout !== match.Layout) setLayout(() => match.Layout)
  }
}

interface RouterProps { 
  routesByPath: Record<string, Route>,
}

interface Route {
  path: string
  Component: FunctionalComponent
  Layout?: FunctionalComponent
  Stack?: FunctionalComponent
}


const RouteHistory: Record<string, number> = {}
function RouteWrapper({ children }: any) {
  const { pathname, search } = location
  useLayoutEffect(hideBodyUntilScrollRestored, [location])
  useEffect(installListeners, [])
  useEffect(recall, [location])

  return children

  function hideBodyUntilScrollRestored() {
    setVisibility('hidden')
  }
  function installListeners() {
    const e = document.getElementById('content')!
    if (e) return scrollListener(e, updateScrollPos)
  }

  function updateScrollPos(scrollTop: number) {
    RouteHistory[pathname + search] = scrollTop
  }
  function recall() {
    const e = document.getElementById('content')
    if (e) {
      if (RouteHistory[pathname + search] && Date.now() - history.state > 3000)
        e.scrollTop = RouteHistory[pathname + location.search]
      else {
        updateScrollPos(0)
        e.scrollTop = 0
      }
    }
    setVisibility('visible')
  }
  function setVisibility(to: 'visible' | 'hidden') {
    const e = document.getElementById('content')
    if (e) e.style.visibility = to
  }
}


/**
 * An HOC to join a page to a route stack
 */
type StackHistoryEntry = { location: UseLocationLocation, scroll: number }
type StackHistory = StackHistoryEntry[]
const StackHistories: Record<string, StackHistory> = {}
export function StackFactory(basePath: string) {
  return function StackHandler({ children }: any) {
    const location = useLocation()
    useLayoutEffect(hideBodyUntilScrollRestored, [location])
    useEffect(installListeners, [basePath, location])

    return children

    function hideBodyUntilScrollRestored() {
      setVisibility('hidden')
    }
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
        // console.log("top")
        scrollTo(top.scroll)
        setVisibility('visible')
        const e = document.getElementById('content')!
        if (e) cancelScrollListen = scrollListener(e, updateScrollPos)
      }
      else if (pathname === basePath) {// recall from stack
        nav(top.location.pathname + top.location.search, { replace: true })
      }
      else { // forward navigation -- add to history 
        // console.log('forward')
        scrollTo(0)
        setVisibility('visible')
        Stack.push({ location, scroll: 0 })
        const e = document.getElementById('content')!
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
    function setVisibility(to: 'visible' | 'hidden') {
      const e = document.getElementById('content')
      if (e) e.style.visibility = to
    }
  }
}


export function PassThrough({ children }: any) {
  return children
}

export function Redirect(to: string) {
  return function Redirect() {
    useLayoutEffect(() => nav(to, { replace: true }), [])
    return <div />
  }
}

/**
 * Inspired by https://github.com/molefrog/wouter's useLocation hook
 */
export interface UseLocationLocation { pathname: string, search: string }
export function useLocation(): UseLocationLocation {
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

// React to a change in navigation
export function navListener(callback: () => any) {
  historyEvents.map((e) => addEventListener(e, callback))
  // callback()
  return function unListen() { historyEvents.map((e) => removeEventListener(e, callback)) }
}
const historyEvents = ['popstate', 'pushState', 'replaceState']

// Helper to navigate to a new page
export function nav(to: string, { replace = false } = {}) {
  history[replace ? 'replaceState' : 'pushState'](Date.now(), '', to)
}
if (!history.state) nav(location.pathname + location.search, { replace: true })

/**
 * Allows setting common page attrs. 
 * - Intelligently us the attrs, only setting if changed
 * - Resets back to initial if omitted, based on initial introspection
 * - Stores element handles in memory to remove need to query the dom
 *   on every update
 */
export interface SetPageMetaProps {
  title: string
  siteName?: string
  author?: string
  description?: string
  image?: string
  locale?: string
}
export function setPageMeta(p: SetPageMetaProps) {
  const title = p.title ? `${p.title} - ${siteName}` : siteName
  if (title !== document.title) document.title = title

  if (link.href !== location.href) link.href = location.href

  author.upsert(p.author || p.title)
  ogTitle.upsert(p.title)
  locale.upsert(p.locale)
  description.upsert(p.description)
  ogDescription.upsert(p.description)
  ogUrl.upsert(location.href)
  ogSiteName.upsert(p.siteName)
  ogImage.upsert(p.image)
}
// Wrapper class on meta elements to simplify usage and make more DRY
class MetaClass {
  get: () => string
  orig: string
  set: (val: string) => void
  constructor(e: Element) {
    this.get = () => e.getAttribute('content')!
    this.set = (v: string) => e.setAttribute('content', v)
    this.orig = this.get()
  }
  upsert(val?: string) {
    if (!val) val = this.orig
    if (this.get() !== val) this.set(val)
  }
}
const link = find('link[rel="canonical"]')! as any
const siteName = byProp('og:site_name').getAttribute('content')!
const author = new MetaClass(byName('author'))
const ogTitle = new MetaClass(byProp('og:title'))
const locale = new MetaClass(byProp('og:locale'))
const description = new MetaClass(byName('description'))
const ogDescription = new MetaClass(byProp('og:description'))
const ogUrl = new MetaClass(byProp('og:url'))
const ogSiteName = new MetaClass(byProp('og:site_name'))
const ogImage = new MetaClass(byProp('og:image'))
function byName(name: string) { return find(`meta[name="${name}"]`) }
function byProp(prop: string) { return find(`meta[property="${prop}"]`) }
function find(selector: string) { return document.head.querySelector(selector)! }


// Intercept changes to navigation to dispatch events and prevent default
(function interceptNavEvents() {
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
    }

    function findLinkTagInParents(node: HTMLElement): any {
      if (node?.nodeName === 'A') return node
      if (node?.parentNode) return findLinkTagInParents(node.parentElement!)
    }
  })
})()


// While History API does have `popstate` event, the only
// proper way to listen to changes via `push/replaceState`
// is to monkey-patch these methods.
//
// See https://stackoverflow.com/a/4585031
;(function monkeyPatchHistory() {
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
})()