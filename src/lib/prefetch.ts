prefetch()

/**
 * Prefetches scripts from the asset-manifest.json file
 * after most browsers would finish loading a page (<10s)
 */
function prefetch() {
    // @ts-ignore
    if(import.meta.env.NODE_ENV === 'production') 
        setTimeout(
            () => 
                fetch("/asset-manifest.json")
                .then((res) => res.json())
                .then((assets: string[]) => {
                    for (let a of Object.values(assets)) {
                        if (a.endsWith("js") && !a.includes("browser-check"))
                            loadAndUnload('/' + a)
                    }
                }).catch((e) => e)
            ,
            10000
        )
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
    // s.onload=() => {
    //     const el = document.querySelector(`script[src="${src}"]`)
    //     el?.remove()
    // }
    document.body.appendChild(s);
    const el = document.querySelector(`script[src="${src}"]`)
    el?.remove()
}