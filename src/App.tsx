import './layout/theme.css'

import { Fragment, h } from 'preact'

import { CtxProviders } from './App.context'
import {ErrorBoundary, UnhandledErrorNotification} from './layout/components/ErrorBoundaries'
import Toast, { ToastFromContext } from './layout/components/Toast'
import { RouterComponent as Router } from './lib/router'
import { routesByPath } from './routes'

export default function App() {
	return (
		<ErrorBoundary>
			<StaleBrowserWarning />
			<CtxProviders>
				<UnhandledErrorNotification />
				<Router routesByPath={routesByPath} />
				<ToastFromContext />
			</CtxProviders>
		</ErrorBoundary>
	)

	function StaleBrowserWarning() {
		const isModern = (
			'fetch' in window &&
			'Promise' in window &&
			'assign' in Object &&
			'keys' in Object
		)
		return isModern
			? <Fragment />
			: <Toast
				icon="error"
				location="bottom"
				duration={-1}
				message={<span>Please use a modern browser and/or update. Internet Explorer is <i>not</i> supported.</span>}
			/>

	}
}

let vh = window.innerHeight
function setVh() {
	if (window.innerHeight !== vh) {
		vh = window.innerHeight
		document.body.style.setProperty('--vh', `${vh}px`)
	}
}
window.addEventListener('load', setVh)
window.addEventListener('resize', setVh)
setInterval(setVh, 2e3)