import { Fragment, h } from 'preact';

import StackRoutes from './pages'
import BottomNav from './components/BottomNav'
import UnhandledErrorNotification from './components/UnhandledErrorNotification'
import DesktopHeader from './components/DesktopHeader'
import MobileHeader from './components/MobileHeader'
import Sidebar from './components/Sidebar'
import SidebarRight from './components/SidebarRight'

export default function App() {
  return <Fragment>
    <UnhandledErrorNotification />
    <DesktopHeader />
    <MobileHeader />
    <Sidebar />
    <SidebarRight />
    <BottomNav />
    <StackRoutes />
  </Fragment>
}
