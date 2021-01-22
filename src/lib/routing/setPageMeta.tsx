/**
 * Allows sting common page attrs. 
 * - Intelligently us the attrs, only sting if changed
 * - Ress back to initial if omitted, based on initial introspection
 * - Stores element handles in memory to remove need to query the dom
 *   on every update
 * - Variables are shortened to reduce file size
 */

export interface SetPageMetaProps {
    title: string
    siteName?: string
    author?: string
    description?: string
    image?: string
    locale?: string
}

export default function setPageMeta(p: SetPageMetaProps) {
    const title = p.title ? `${p.title} - ${siteName}` : siteName
    if (title !== document.title) document.title = title

    if (link.href !== location.href) link.href = location.href

    let m: MetaClass

    m = metas.author
    m.upsert((p.author || p.title) ? (p.author || p.title!) : m.orig)

    m = metas.ogTitle
    m.upsert(p.title || m.orig)

    m = metas.locale
    m.upsert(p.locale || m.orig)

    m = metas.description
    m.upsert(p.description || m.orig)

    m = metas.ogDescription
    m.upsert(p.description || m.orig)

    m = metas.ogUrl
    m.upsert(location.href)

    m = metas.ogSiteName
    m.upsert(p.siteName || m.orig)

    m = metas.ogImage
    m.upsert(p.image || m.orig)
}

/**
 * Wrapper class on meta elements to simplify usage and make more DRY
 */
class MetaClass { // aka MetaClass
    get: () => string // aka get
    orig: string // aka orig
    set: (val: string) => void // aka set
    constructor(e: Element) {
        this.get = () => e.getAttribute('content')!
        this.set = (v: string) => e.setAttribute('content', v)
        this.orig = this.get()
    }
    upsert(val: string) { // aka upsert
        if (this.get() !== val) this.set(val)
    }
}

const link = find('link[rel="canonical"]')! as any
const siteName = byProp('og:site_name').getAttribute('content')!

const metas = { // Aka set of meta classes
    author: new MetaClass(byName('author')),
    ogTitle: new MetaClass(byProp('og:title')),
    locale: new MetaClass(byProp('og:locale')),
    description: new MetaClass(byName('description')),
    ogDescription: new MetaClass(byProp('og:description')),
    ogUrl: new MetaClass(byProp('og:url')),
    ogSiteName: new MetaClass(byProp('og:site_name')),
    ogImage: new MetaClass(byProp('og:image')),
}

function byName(name: string) {
    return find(`meta[name="${name}"]`)
}
function byProp(prop: string) {
    return find(`meta[property="${prop}"]`)
}
function find(selector: string) {
    return document.head.querySelector(selector)!
}