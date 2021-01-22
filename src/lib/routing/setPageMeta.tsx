/**
 * Allows setting common page attrs. 
 * - Intelligently us the attrs, only setting if changed
 * - Resets back to initial if omitted, based on initial introspection
 * - Stores element handles in memory to remove need to query the dom
 *   on every update
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

    author.upsert(p.author || p.title)
    ogTitle.upsert(p.title)
    locale.upsert(p.locale)
    description.upsert(p.description)
    ogDescription.upsert(p.description)
    ogUrl.upsert(location.href)
    ogSiteName.upsert(p.siteName)
    ogImage.upsert(p.image)
}

/**
 * Wrapper class on meta elements to simplify usage and make more DRY
 */
class MetaClass {
    get: () => string
    orig: string
    set: (val: string) => void
    constructor(e: Element) {
        this.get = () => e.getAttribute('content')!
        this.set = (v: string) => e.setAttribute('content', v)
        this.orig = this.get()
    }
    upsert(val?: string) {
        if (!val) val = this.orig
        if (this.get() !== val) this.set(val)
    }
}

const link = find('link[rel="canonical"]')! as any
const siteName = byProp('og:site_name').getAttribute('content')!
const author = new MetaClass(byName('author'))
const ogTitle = new MetaClass(byProp('og:title'))
const locale = new MetaClass(byProp('og:locale'))
const description = new MetaClass(byName('description'))
const ogDescription = new MetaClass(byProp('og:description'))
const ogUrl = new MetaClass(byProp('og:url'))
const ogSiteName = new MetaClass(byProp('og:site_name'))
const ogImage = new MetaClass(byProp('og:image'))

function byName(name: string) {
    return find(`meta[name="${name}"]`)
}
function byProp(prop: string) {
    return find(`meta[property="${prop}"]`)
}
function find(selector: string) {
    return document.head.querySelector(selector)!
}