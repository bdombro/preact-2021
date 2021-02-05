/**
 * Features to support css-in-js, similarly to styled-components but extremely lean
 * 
 * Styled-components and it's dependencies are > 30kb gzipped. That, and it doesn't
 * even support preact. In contrast, this library is < 1kb gzipped.
 * 
 * Inspired by styled-components and styled-jsx (thanks!)
 */
import { h } from 'preact'

let count = 0

/**
 * Injects style elements to the page if they don't already exist
 *
 * @param css - css to be transpiled and injected. :root is replaced by a unique class
 *
 * Returns the unique class name
 */
export default function styled(strings: TemplateStringsArray, ...placeHolders: string[]) {
	let css = strings.map((s, i) => s + (placeHolders?.[i] ?? '')).join('')
	const root = 's' + count++
	css = css.replace(/:root/g, '.' + root)
	document.head.innerHTML += `<style type="text/css">${css}</style>`
	return root
}

/**
 * Factories to quickly create elements with css styles
 * @param css - css to be transpiled and injected. :root is replaced by a unique class
 */
styled.a = function a(strings: TemplateStringsArray, ...placeHolders: string[]) {
	const root = styled`${assembleTemplateString(strings, placeHolders)}`
	return function C(p: h.JSX.HTMLAttributes<HTMLAnchorElement>) {
		return <a {...p} class={combineClasses(root,p.class,p.className)} />
	}
}
styled.button = function button(strings: TemplateStringsArray, ...placeHolders: string[]) {
	const root = styled`${assembleTemplateString(strings, placeHolders)}`
	return function C(p: h.JSX.HTMLAttributes<HTMLButtonElement>) {
		return <button {...p} class={combineClasses(root,p.class,p.className)} />
	}
}
styled.div = function div(strings: TemplateStringsArray, ...placeHolders: string[]) {
	const root = styled`${assembleTemplateString(strings, placeHolders)}`
	return function C(p: h.JSX.HTMLAttributes<HTMLDivElement>) {
		return <div {...p} class={combineClasses(root,p.class,p.className)} />
	}
}
styled.img = function img(strings: TemplateStringsArray, ...placeHolders: string[]) {
	const root = styled`${assembleTemplateString(strings, placeHolders)}`
	return function C(p: h.JSX.HTMLAttributes<HTMLImageElement>) {
		return <img {...p} class={combineClasses(root,p.class,p.className)} />
	}
}
styled.form = function div(strings: TemplateStringsArray, ...placeHolders: string[]) {
	const root = styled`${assembleTemplateString(strings, placeHolders)}`
	return function C(p: h.JSX.HTMLAttributes<HTMLFormElement>) {
		return <form {...p} class={combineClasses(root,p.class,p.className)} />
	}
}
styled.input = function input(strings: TemplateStringsArray, ...placeHolders: string[]) {
	const root = styled`${assembleTemplateString(strings, placeHolders)}`
	return function C(p: h.JSX.HTMLAttributes<HTMLInputElement>) {
		return <input {...p} class={combineClasses(root,p.class,p.className)} />
	}
}
styled.label = function label(strings: TemplateStringsArray, ...placeHolders: string[]) {
	const root = styled`${assembleTemplateString(strings, placeHolders)}`
	return function C(p: h.JSX.HTMLAttributes<HTMLLabelElement>) {
		return <label {...p} class={combineClasses(root,p.class,p.className)} />
	}
}
styled.nav = function nav(strings: TemplateStringsArray, ...placeHolders: string[]) {
	const root = styled`${assembleTemplateString(strings, placeHolders)}`
	return function C(p: h.JSX.HTMLAttributes<HTMLElement>) {
		return <nav {...p} class={combineClasses(root,p.class,p.className)} />
	}
}
styled.textarea = function textarea(strings: TemplateStringsArray, ...placeHolders: string[]) {
	const root = styled`${assembleTemplateString(strings, placeHolders)}`
	return function C(p: h.JSX.HTMLAttributes<HTMLTextAreaElement>) {
		return <textarea {...p} class={combineClasses(root,p.class,p.className)} />
	}
}


function assembleTemplateString(strings: TemplateStringsArray, placeHolders: string[]) {
	return strings.map((s, i) => s + (placeHolders?.[i] ?? '')).join('')
}

function combineClasses(...classes: (string | undefined)[]) {
	return classes.filter(c => c).join(' ')
}