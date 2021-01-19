import { Fragment, h } from 'preact';

import StackRoutes from './pages'
import UnhandledErrorNotification from './components/UnhandledErrorNotification'
import DashboardLayout from './components/DashboardLayout';

export default function App() {
  return <DashboardLayout>
    <UnhandledErrorNotification />
    <StackRoutes />
  </DashboardLayout>
}
