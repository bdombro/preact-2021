import { Fragment, h } from 'preact';

import Router from './routes/router'
import UnhandledErrorNotification from './components/UnhandledErrorNotification'

export default function App() {
  return <Fragment>
    <UnhandledErrorNotification />
    <Router />
  </Fragment>
}
