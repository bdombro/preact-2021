import './layout/theme.css'

import { h } from 'preact'

import { CtxProviders } from './App.context'
import {ErrorBoundary, UnhandledErrorNotification} from './layout/components/ErrorBoundaries'
import { RouterComponent } from './lib/router'
import { routesByPath } from './routes'

export default function App() {
	return (
		<ErrorBoundary>
			<CtxProviders>
				<UnhandledErrorNotification />
				<RouterComponent routesByPath={routesByPath} />
			</CtxProviders>
		</ErrorBoundary>
	)
}
