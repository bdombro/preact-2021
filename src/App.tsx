import { h } from 'preact'

import { CtxProviders } from './App.context'
import { RouterComponent } from './layout/router'
import UnhandledErrorNotification from './layout/UnhandledErrorNotification'
import { routesByPath } from './routes/routes'

export default function App() {
  return <CtxProviders>
    <UnhandledErrorNotification />
    <RouterComponent routesByPath={routesByPath} />
  </CtxProviders>
}
