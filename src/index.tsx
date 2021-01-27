import './theme.css';
import './lib/prefetch';
import { h, render } from 'preact';
import 'preact/devtools';
import App from './App.js';

const root = document.getElementById('root')

render(<App />, root!);
