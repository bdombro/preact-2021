import './theme.css'

export class Theme {
	primaryH = 0; primaryS = 0; primaryL = 30; primary = ''
	secondaryH = 0; secondaryS = 0; secondaryL = 40; secondary = ''
	successH: 130; successS: 50; successL: 40; success = ''
	warningH: 45; warningS: 100; warningL: 40; warning = ''
	dangerH: 0; dangerS: 100; dangerL: 40; danger = ''

	constructor(vals: Partial<Theme>) {
		Object.assign(this, vals)
		this.primary = `hsl(${this.primaryH},${this.primaryS}%,${this.primaryL}%)`
		this.secondary = `hsl(${this.secondaryH},${this.secondaryS}%,${this.secondaryL}%)`
		this.success = `hsl(${this.successH},${this.successS}%,${this.successL}%)`
		this.warning = `hsl(${this.warningH},${this.warningS}%,${this.warningL}%)`
		this.danger = `hsl(${this.dangerH},${this.dangerS}%,${this.dangerL}%)`
	}
}

export const loadingTheme = new Theme({})
export const defaultTheme = new Theme({
	primaryH: 270, primaryS: 80, primaryL: 33,
	secondaryH: 45, secondaryS: 100, secondaryL: 40,
})
export const tenantDemoTheme = new Theme({
	primaryH: 160, primaryS: 100, primaryL: 15,
	secondaryH: 63, secondaryS: 25, secondaryL: 43,
})

export let currentTheme = loadingTheme 
export function applyTheme(theme: Theme = loadingTheme) {
	const t = theme
	const s = setCssVariable
	s('--primary-h', t.primaryH); s('--primary-s', t.primaryS + '%'); s('--primary-l', t.primaryL + '%')
	s('--secondary-h', t.secondaryH); s('--secondary-s', t.secondaryS + '%'); s('--secondary-l', t.secondaryL + '%')
	s('--success-h', t.successH); s('--success-s', t.successS + '%'); s('--success-l', t.successL + '%')
	s('--warning-h', t.warningH); s('--warning-s', t.warningS + '%'); s('--warning-l', t.warningL + '%')
	s('--danger-h', t.dangerH); s('--danger-s', t.dangerS + '%'); s('--danger-l', t.dangerL + '%')
	currentTheme = t
}

export function getCssVariable(key: string) {return getComputedStyle(document.documentElement).getPropertyValue(key) || ''}
export function setCssVariable(key: string, val: number | string) {document.documentElement.style.setProperty(key, `${val}`)}

export function addCss(css: string) {
	const link = document.createElement('link')
	link.type = 'text/css'
	link.rel = 'stylesheet'
	link.innerHTML = css
	document.head.appendChild(link)
}
