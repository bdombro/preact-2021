import './layout/theme.css'

import { h } from 'preact'

import { CtxProviders } from './App.context'
import UnhandledErrorNotification from './layout/components/UnhandledErrorNotification'
import { RouterComponent } from './lib/router'
import { routesByPath } from './routes'

export default function App() {
  return <CtxProviders>
    <UnhandledErrorNotification />
    <RouterComponent routesByPath={routesByPath} />
  </CtxProviders>
}
