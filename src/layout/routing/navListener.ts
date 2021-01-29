/**
 * React to a change in navigation
 */
export default function navListener(callback: () => any) {
  import('./hijackHistory')
  events.map((e) => addEventListener(e, callback))
  // callback()
  return function unListen() { events.map((e) => removeEventListener(e, callback)) }
}

const events = ['popstate', 'pushState', 'replaceState']