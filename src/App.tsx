import { Fragment as F, h } from 'preact'

import UnhandledErrorNotification from './layout/UnhandledErrorNotification'
import Router from './routes/router'

export default function App() {
  return <F>
    <UnhandledErrorNotification />
    <Router />
  </F>
}
