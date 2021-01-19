import { h } from 'preact';
import lazy from '~/components/lazy';

const UserList = lazy(() => import('./routes/UserList'))
const User = lazy(() => import('./routes/User'))

export default function UserRouter() {
    return false 
    || location.pathname === '/auth/users' && <UserList />
    || <User />
}