import { Fragment, h } from 'preact';

import Router from './routes/router'
import UnhandledErrorNotification from './layout/UnhandledErrorNotification'

export default function App() {
  return <Fragment>
    <UnhandledErrorNotification />
    <Router />
  </Fragment>
}
