import { h } from 'preact';

import StackRoutes from './stacks'
import Nav from './components/Nav'

export default function App() {
  return <div>
    <h1><a href='/'>Stack Router Demo</a></h1>
    <Nav />
    <StackRoutes />
  </div>
}
