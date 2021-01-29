import { Fragment as F, h } from 'preact';

import Router from './routes/router'
import UnhandledErrorNotification from './layout/UnhandledErrorNotification'

export default function App() {
  return <F>
    <UnhandledErrorNotification />
    <Router />
  </F>
}
