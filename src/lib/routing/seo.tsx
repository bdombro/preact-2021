/**
 * Utils to manage Page Header for SEO
 * 
 */

/**
 * Allows setting common page attrs. 
 * - Intelligently upserts the attrs, only setting if changed
 * - Resets back to initial if omitted, based on initial introspection
 * - Stores element handles in memory to remove need to query the dom
 *   on every update
 */
export function setPageMeta(props: SetPageMetaProps = {}) {
    setters.forEach(s => s(props))
}
interface SetPageMetaProps {
    siteName?: string
    title?: string
    author?: string
    description?: string
    image?: string
    locale?: string
}

/**
 * Wrapper class on meta elements to simplify usage and make more DRY
 */
class MetaClass {
    get: () => string
    orig: string
    set: (val: string) => void
    constructor(el: Element) {
        this.get = () => el.getAttribute('content')!
        this.set = (next: string) => el.setAttribute('content', next)
        this.orig = this.get()
    }
    upsert(next: string) {
        if (this.get() !== next) this.set(next)
    }
}

/**
 * A set of SEO setters to be applied on route change
 * - Each accept the same props so they can be easily ran my forEach
 * - They intelligently upsert meta value, only setting if changed
 * - Reset back to initial if omitted, based on initial introspection
 * - Uses a factory strategy, in order to store element handles in memory
 *   to remove need to query the dom on every update
 */
const setters = [
    (() => ({ title }: SetPageMetaProps) => {
        const siteName = byProp('og:site_name').getAttribute('content')!
        const next = title ? `${title} - ${siteName}` : siteName
        if(next !== document.title) document.title = next
    })(),
    (() => {
        const el = document.head.querySelector('link[rel="canonical"]')! as any
        return () => {if(el.href !== location.href) el.href = location.href}
    })(),
    (() => {
        const mc = new MetaClass(byName('author'))
        return (p: SetPageMetaProps) => mc.upsert((p.author || p.title) ? (p.author || p.title!) : mc.orig)
    })(),
    (() => {
        const mc = new MetaClass(byProp('og:title'))
        return (p: SetPageMetaProps) => mc.upsert(p.title || mc.orig)
    })(),
    (() => {
        const mc = new MetaClass(byProp('og:locale'))
        return (p: SetPageMetaProps) => mc.upsert(p.locale || mc.orig)
    })(),
    (() => {
        const mc = new MetaClass(byName('description'))
        return (p: SetPageMetaProps) => mc.upsert(p.description || mc.orig)
    })(),
    (() => {
        const mc = new MetaClass(byProp('og:description'))
        return (p: SetPageMetaProps) => mc.upsert(p.description || mc.orig)
    })(),
    (() => {
        const mc = new MetaClass(byProp('og:url'))
        return () => mc.upsert(location.href)
    })(),
    (() => {
        const mc = new MetaClass(byProp('og:site_name'))
        return (p: SetPageMetaProps) => mc.upsert(p.siteName || mc.orig)
    })(),
    (() => {
        const mc = new MetaClass(byProp('og:image'))
        return (p: SetPageMetaProps) => mc.upsert(p.image || mc.orig)
    })(),
]

function byName(name: string) {
    return document.head.querySelector(`meta[name="${name}"]`)!
}
function byProp(prop: string) {
    return document.head.querySelector(`meta[property="${prop}"]`)!
}
