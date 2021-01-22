const events = ["popstate", "pushState", "replaceState"];

export function navListen(callback: () => any) {
    events.map((e) => addEventListener(e, callback));
    // callback()
    return function detachListener() { events.map((e) => removeEventListener(e, callback)) }
}

// export function navUnlisten(callback: () => any) {
//     events.map((e) => removeEventListener(e, callback))
// }

export function nav(to: string, { replace = false } = {}) {
    history[replace ? "replaceState" : "pushState"](Date.now(), "", to)
}
if (!history.state) nav(location.pathname + location.search, { replace: true})

// While History API does have `popstate` event, the only
// proper way to listen to changes via `push/replaceState`
// is to monkey-patch these methods.
//
// See https://stackoverflow.com/a/4585031
;(function monkeyPatchHistory() {
    if (typeof history !== "undefined") {
        for (const type of ["pushState", "replaceState"]) {
            const original = (history as any)[type];

            (history as any)[type] = function () {
                const result = original.apply(this, arguments);
                const event = new Event(type);
                (event as any).arguments = arguments;

                dispatchEvent(event);
                return result;
            }
        }
    }
})()

;(function attachLinkHandler() {
    document.body.addEventListener('click', handler);
    return () => { document.body.removeEventListener('click', handler) }
    function handler(e: any) {
        const ln = findLinkTagInParents(e.target) // aka linkNode
        if (
            ln 
            && ln.host === window.location.host
            && (
                ln.pathname !== window.location.pathname
                || ln.search !== window.location.search
            )
        ) {
            e.preventDefault()
            const s = new URLSearchParams(ln.search)
            const replace = s.get('replace')
            if (replace) {
                s.delete('replace')
                const searchStr = s.toString() ? '?' + s.toString() : ''
                nav(ln.pathname + searchStr, {replace: true})
            }
            else 
                nav(ln.pathname + ln.search)
        }
    }
    function findLinkTagInParents(node: HTMLElement): any {
        if (node?.nodeName === 'A') return node
        if (node?.parentNode) return findLinkTagInParents(node.parentElement!)
    }
})()