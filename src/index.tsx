import('./layout/theme/theme')
import { h, render } from 'preact'
import 'preact/devtools'
import App from './App.jsx'

const root = document.getElementById('root')

render(<App />, root!)

if ((import.meta as any).env.NODE_ENV === 'production'){
    setInterval(() => { import('./layout/prefetch'); import('./layout/browserCheck') }, 30000)
    navigator.serviceWorker.register('/sw.js')
}
