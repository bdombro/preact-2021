import 'preact/devtools'

import { h, render } from 'preact'

import App from './App.jsx'

const root = document.getElementById('root')
const isProd = (import.meta as any).env.NODE_ENV === 'production'

render(<App />, root!)

if (isProd){
	navigator.serviceWorker.register('/sw.js')
}
