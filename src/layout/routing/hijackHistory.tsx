/**
 * Intercept changes to navigation to dispatch events and prevent default
 */
import nav from './nav'

export let loaded = 0
if (!loaded++) {
  document.body.addEventListener('click', function linkIntercepter(e: any) {
    const ln = findLinkTagInParents(e.target) // aka linkNode

    if (ln?.host === window.location.host) {
      window.dispatchEvent(new Event('link-clicked'))
      e.preventDefault()

      if (ln.hash) window.dispatchEvent(new Event(ln.hash))

      if (ln.pathname + ln.search !== window.location.pathname + window.location.search) {
        if (ln.hash === '#replace')
          nav(ln.pathname + ln.search, {replace: true})
        else 
          nav(ln.pathname + ln.search)
      }
    }
    
    function findLinkTagInParents(node: HTMLElement): any {
      if (node?.nodeName === 'A') return node
      if (node?.parentNode) return findLinkTagInParents(node.parentElement!)
    }
  })

    
  // While History API does have `popstate` event, the only
  // proper way to listen to changes via `push/replaceState`
  // is to monkey-patch these methods.
  //
  // See https://stackoverflow.com/a/4585031
  if (typeof history !== 'undefined') {
    for (const type of ['pushState', 'replaceState']) {
      const original = (history as any)[type]

      ;(history as any)[type] = function (...props: any) {
        const result = original.apply(this, props)
        const event = new Event(type);
        (event as any).arguments = props

        dispatchEvent(event)
        return result
      }
    }
  }
}