/**
 * Adapted from https://github.com/molefrog/wouter's useLocation hook
 */
import { useEffect, useRef, useState } from "react";

export interface UseLocationLocation { pathname: string, search: string }

export default function useLocation(): UseLocationLocation {
    const [location, setLocation] = useState<UseLocationLocation>(currentLocation)
    const prevPath = useRef(location);
    useEffect(attachListeners, []);

    return location

    function attachListeners() {
        const events = ["popstate", "pushState", "replaceState"];
        events.map((e) => addEventListener(e, checkForUpdates));

        // it's possible that an update has occurred between render and the effect handler,
        // so we run additional check on mount to catch these updates. Based on:
        // https://gist.github.com/bvaughn/e25397f70e8c65b0ae0d7c90b731b189
        checkForUpdates();

        return () => { events.map((e) => removeEventListener(e, checkForUpdates)) }

        // this function checks if the location has been changed since the
        // last render and updates the state only when needed.
        // unfortunately, we can't rely on `path` value here, since it can be stale,
        // that's why we store the last pathname in a ref.
        function checkForUpdates() {
            const next = currentLocation();
            if (prevPath.current.pathname !== next.pathname || prevPath.current.search !== next.search) {
                prevPath.current = next
                setLocation(next)
            }
        }
    }
}
export function navigate(to: string, { replace = false } = {}) {
    history[replace ? "replaceState" : "pushState"](null, "", to)
}

// While History API does have `popstate` event, the only
// proper way to listen to changes via `push/replaceState`
// is to monkey-patch these methods.
//
// See https://stackoverflow.com/a/4585031
if (typeof history !== "undefined") {
    for (const type of ["pushState", "replaceState"]) {
        const original = (history as any)[type];

        (history as any)[type] = function () {
            const result = original.apply(this, arguments);
            const event = new Event(type);
            (event as any).arguments = arguments;

            dispatchEvent(event);
            return result;
        };
    }
}

function currentLocation() {
    return { pathname: window.location.pathname, search: window.location.search }
}