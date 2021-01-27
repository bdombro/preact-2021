// TODO: Figure out how/when to call this.
/**
 * ref: https://awesomeopensource.com/project/pastelsky/network-idle-callback?categoryPage=19
 * Maybe in service worker?
 */
function prefetch() {
    fetch("/asset-manifest.json")
    .then((res) => res.json())
    .then((assets: string[]) => {
        Object.values(assets).forEach((a) => {
            if (a.endsWith("js") && !a.includes("browser-check"))
            push("/" + a);
        });
    }).catch((e) => e)
}
function push(src: string) {
    var s = document.createElement("script");
    s.setAttribute("src", src);
    s.setAttribute("type", "module");
    s.setAttribute("async", "true");
    s.setAttribute("defer", "true");
    document.body.appendChild(s);
}
window.addEventListener('prefetch', prefetch)