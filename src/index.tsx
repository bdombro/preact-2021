import('./layout/theme/theme')
import { h, render } from 'preact'
import 'preact/devtools'
import App from './App.jsx'

const root = document.getElementById('root')

render(<App />, root!)


if ((import.meta as any).env.NODE_ENV === 'production' && location.hostname !== 'localhost') 
    setInterval(() => import('./layout/prefetch'), 10000)