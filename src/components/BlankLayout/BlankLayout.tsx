import './BlankLayout.css'
import { h } from 'preact'

export default function DashboardLayout({ children }: { children: any }) {
  return <div className="blank-layout">
    {children}
  </div>
}
