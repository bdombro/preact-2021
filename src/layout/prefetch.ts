prefetch()

/**
 * Prefetches scripts from the asset-manifest.json file
 * after most browsers would finish loading a page (<10s)
 */
export function prefetch() {
    fetch("/asset-manifest.json")
        .then((res) => res.json())
        .then((assets: string[]) => {
            for (let a of Object.values(assets)) {
                if (a.endsWith("js") && !a.includes("browser-check"))
                    loadAndUnload('/' + a)
            }
        })
        .catch(e => e)
}

/**
 * Appends a script tag with the src prop and waits for it to finish loading
 * 
 * Returns a promise that resolves when done.
 */
async function loadAndUnload(src: string) {
    var s = document.createElement("script");
    s.setAttribute("src", src);
    s.setAttribute("class", 'prefetcher');
    s.setAttribute("type", "module");
    s.setAttribute("async", "true");
    document.body.appendChild(s);
    document.querySelector(`script[src="${src}"]`)?.remove()
}