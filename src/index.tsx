import('./lib/theme/theme')
import { h, render } from 'preact'
import 'preact/devtools'
import App from './App.js'

const root = document.getElementById('root')

render(<App />, root!)

setInterval(() => import('./lib/prefetch'), 10000)