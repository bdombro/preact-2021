import './BlankLayout.css'
import { h } from 'preact'

export default function BlankLayout({ children }: { children: any }) {
  return <div id="layout" class="blankLayout">
    <div id="content">
      {children}
    </div>
  </div>
}
