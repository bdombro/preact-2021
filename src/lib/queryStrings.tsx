import { nav } from './router'

export default {
	parse<T extends Record<string, any>>(qs = location.search) {
		return Object.fromEntries((new URLSearchParams(qs) as any).entries()) as T
	},
	create(obj: any, {upsert = false, skipNulls = true, includeQuestionMark = true}) {
		if (upsert) obj = Object.assign(this.parse(), obj)
		if (skipNulls) Object.entries(obj).forEach(([k,v]) => {
			if(v === '' || v === null || v === undefined) delete obj[k]
		})
		const sp = new URLSearchParams()
		Object.entries(obj).forEach(function setUrlSearchParams([k,v]) {
			sp.set(k,v as any)
		})
		const qs = sp.toString()
		return (includeQuestionMark && qs ? '?' : '') + qs
	},
}