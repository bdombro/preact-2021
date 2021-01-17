import { lazy, Suspense } from 'react'

const UserList = lazy(() => import('./routes/UserList'))
const User = lazy(() => import('./routes/User'))

export default function UserRouter() {
    return (
        <Suspense fallback={<div/>}>{
            location.pathname === '/auth/users' && <UserList />
            || <User />
        }</Suspense>
    )
}