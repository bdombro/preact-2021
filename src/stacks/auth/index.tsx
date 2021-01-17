import { lazy, Suspense } from 'react'
import {useStackHandler} from '../../components/routing'

import UserRouter from './routes/users'

const NotFound = lazy(() => import('../NotFound'))

const basePath = '/auth'
export default function AuthStack() {
    const { pathname } = useStackHandler(basePath, '/users')
    return (
        <Suspense fallback={<div/>}>{
            !pathname.startsWith(basePath + '/') && <div/>
            || pathname.startsWith(basePath + '/users') && <UserRouter />
            || <NotFound />
        }</Suspense>
    )       
}
AuthStack.basePack = basePath