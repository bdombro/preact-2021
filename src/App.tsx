import './layout/theme.css'

import { h } from 'preact'

import { CtxProviders } from './App.context'
import {ErrorBoundary, UnhandledErrorNotification} from './layout/components/ErrorBoundaries'
import { ToastFromContext } from './layout/components/Toast'
import { RouterComponent as Router } from './lib/router'
import { routesByPath } from './routes'

export default function App() {
	return (
		<ErrorBoundary>
			<CtxProviders>
				<UnhandledErrorNotification />
				<Router routesByPath={routesByPath} />
				<ToastFromContext />
			</CtxProviders>
		</ErrorBoundary>
	)
}

if(location.hostname != 'localhost') setTimeout(() => {
	document.body.innerHTML += `
		<div id="outdated"></div>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/outdated-browser-rework/2.10.0/style.min.css" />
		<script src="https://cdnjs.cloudflare.com/ajax/libs/outdated-browser-rework/2.10.0/outdated-browser-rework.min.js"></script>
		<script>
			outdatedBrowserRework({
				browserSupport: {
					Chrome: 80, // > Feb 2020
					Edge: 79, // > Feb 2020
					Safari: 13, // > 2019
					"Mobile Safari": 10,
					Firefox: 73, // > 2019
					Opera: 66, // > 2019
					Vivaldi: 3, // > April 2020
					Yandex: 20, // > 2019
					IE: false
				},
				requireChromeOnAndroid: true,isUnknownBrowserOK: false
			});
		</script>
	`
}, 10e3)

const setVh = () => {
	const vh = window.innerHeight
	document.body.style.setProperty('--vh', `${vh}px`)
}
window.addEventListener('load', setVh)
window.addEventListener('resize', setVh)