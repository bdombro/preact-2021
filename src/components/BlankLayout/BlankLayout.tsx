import './BlankLayout.css'
import { h } from 'preact'

export default function DashboardLayout({ children }: { children: any }) {
  return <div id="layout" className="blankLayout">
    <div id="content">
      {children}
    </div>
  </div>
}
