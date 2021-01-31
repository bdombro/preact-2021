import { h } from 'preact'

import { CtxProviders } from './App.context'
import UnhandledErrorNotification from './layout/UnhandledErrorNotification'
import {RoutesComponent} from './routes/routes'

export default function App() {
  return <CtxProviders>
    <UnhandledErrorNotification />
    <RoutesComponent />
  </CtxProviders>

}