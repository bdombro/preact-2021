import 'preact/devtools'

import { h, render } from 'preact'

import App from './App.jsx'

const root = document.getElementById('root')

render(<App />, root!)

if ((import.meta as any).env.NODE_ENV === 'production'){
  navigator.serviceWorker.register('/sw.js')
}
