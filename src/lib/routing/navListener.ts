/**
 * React to a change in navigation
 */
export default function navListener(callback: () => any) {
    setInterval(() => import('./hijack'), 1000)
    events.map((e) => addEventListener(e, callback));
    // callback()
    return function unListen() { events.map((e) => removeEventListener(e, callback)) }
}

const events = ["popstate", "pushState", "replaceState"];