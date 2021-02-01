/**
 * Call a function on scroll event
 * 
 * If scroll event appears to happen near a nav event, skip
 */
export default function scrollListener(el: HTMLElement, callback: any) {
	let last_known_scroll_position = 0
	let ticking = false
	el.addEventListener('scroll', listener)
	return function unlisten() { el.removeEventListener('scroll', listener) }

	function listener() {
		last_known_scroll_position = el.scrollTop
		// const navJustHappened = Date.now() - lastNavEvent < 1000
		if (!ticking) {
			window.requestAnimationFrame(() => {
				callback(last_known_scroll_position)
				ticking = false
			})
			ticking = true
		}
	}
}
