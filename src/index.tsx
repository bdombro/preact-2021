import './theme.css';
import { h, render } from 'preact';
import 'preact/devtools';
import App from './App.js';

const root = document.getElementById('root')

render(<App />, root!);
