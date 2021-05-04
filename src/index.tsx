import 'preact/devtools'
import './lib/polyfills'

import { h, render } from 'preact'

import App from './App.jsx'

const root = document.getElementById('root')
window.isProd = import.meta.env.NODE_ENV === 'production'

render(<App />, root!)

if (window.isProd){
	navigator.serviceWorker.register('/sw.js')
}
