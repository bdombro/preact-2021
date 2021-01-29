/**
 * Helper to navigate to a new page
 */
export default function nav(to: string, { replace = false } = {}) {
  history[replace ? 'replaceState' : 'pushState'](Date.now(), '', to)
}
if (!history.state) nav(location.pathname + location.search, { replace: true})