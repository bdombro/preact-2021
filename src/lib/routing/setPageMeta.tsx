/**
 * Allows sting common page attrs. 
 * - Intelligently us the attrs, only sting if changed
 * - Ress back to initial if omitted, based on initial introspection
 * - Stores element handles in memory to remove need to query the dom
 *   on every update
 * - Variables are shortened to reduce file size
 */

interface UsePageMetaProps {
    siteName?: string
    title?: string
    author?: string
    description?: string
    image?: string
    locale?: string
}

export default function setPageMeta(p: UsePageMetaProps = {}) {
    const t = p.title ? `${p.title} - ${siteName}` : siteName
    if (t !== document.title) document.title = t

    if (link.href !== location.href) link.href = location.href

    let m: M // aka metaclass

    m = ms.author
    m.u((p.author || p.title) ? (p.author || p.title!) : m.o)

    m = ms.ogTitle
    m.u(p.title || m.o)

    m = ms.locale
    m.u(p.locale || m.o)

    m = ms.description
    m.u(p.description || m.o)

    m = ms.ogDescription
    m.u(p.description || m.o)

    m = ms.ogUrl
    m.u(location.href)

    m = ms.ogSiteName
    m.u(p.siteName || m.o)

    m = ms.ogImage
    m.u(p.image || m.o)
    return null
}

/**
 * Wrapper class on meta elements to simplify usage and make more DRY
 */
class M { // aka MetaClass
    g: () => string // aka get
    o: string // aka orig
    s: (val: string) => void // aka set
    constructor(e: Element) {
        this.g = () => e.getAttribute('content')!
        this.s = (v: string) => e.setAttribute('content', v)
        this.o = this.g()
    }
    u(v: string) { // aka upsert
        if (this.g() !== v) this.s(v)
    }
}

const link = qs('link[rel="canonical"]')! as any
const siteName = byP('og:site_name').getAttribute('content')!

const ms = { // Aka set of meta classes
    author: new M(byN('author')),
    ogTitle: new M(byP('og:title')),
    locale: new M(byP('og:locale')),
    description: new M(byN('description')),
    ogDescription: new M(byP('og:description')),
    ogUrl: new M(byP('og:url')),
    ogSiteName: new M(byP('og:site_name')),
    ogImage: new M(byP('og:image')),
}

function byN(name: string) { // aka getMetaByName
    return qs(`meta[name="${name}"]`)
}
function byP(prop: string) { // aka getMetaByProp
    return qs(`meta[property="${prop}"]`)
}
function qs(q: string) { // aka query selector
    return document.head.querySelector(q)!
}