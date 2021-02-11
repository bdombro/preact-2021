export default {
	parse<T extends Record<string, any>>(qs = location.search) {
		return Object.fromEntries((new URLSearchParams(qs) as any).entries()) as T
	},
	create(obj: any) {
		const res = new URLSearchParams()
		Object.entries(obj).forEach(function setUrlSearchParams([k,v]) {
			res.set(k,v as any)
		})
		return res.toString()
	}
}