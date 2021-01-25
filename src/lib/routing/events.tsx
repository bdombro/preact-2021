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

// TODO: Login events

export function scrollListen(el: HTMLElement, callback: any) {
    let last_known_scroll_position = 0;
    let ticking = false;
    el.addEventListener('scroll', function () {
        last_known_scroll_position = el.scrollTop;
        if (!ticking) {
            window.requestAnimationFrame(function () {
                callback(last_known_scroll_position);
                ticking = false;
            });
            ticking = true;
        }
    })
    return () => el.removeEventListener('scroll', callback)
}


;(function attachLinkHandler() {
    document.body.addEventListener('click', handler);
    return () => { document.body.removeEventListener('click', handler) }
    function handler(e: any) {
        const ln = findLinkTagInParents(e.target) // aka linkNode

        if (ln?.host === window.location.host) {
            window.dispatchEvent(new Event('link-clicked'))
            e.preventDefault()

            if (ln.hash) {
                window.dispatchEvent(new Event(ln.hash))
                
                // Special events
                if (ln.hash === '#theme-toggle')
                    document.body.className.includes('dark') ? document.body.classList.remove("dark") : document.body.classList.add("dark")
            }

            if (ln.pathname + ln.search !== window.location.pathname + window.location.search) {
                if (ln.hash === '#replace')
                    nav(ln.pathname + ln.search, {replace: true})
                else 
                    nav(ln.pathname + ln.search)
            }
        }
    }
    function findLinkTagInParents(node: HTMLElement): any {
        if (node?.nodeName === 'A') return node
        if (node?.parentNode) return findLinkTagInParents(node.parentElement!)
    }
})()