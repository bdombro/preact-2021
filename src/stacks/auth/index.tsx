import { h } from 'preact'
import lazy from '~/components/lazy'
import {useStackHandler} from '../../components/routing'

import UserRouter from './routes/users'

const NotFound = lazy(() => import('../NotFound'))

const basePath = '/auth'
export default function AuthStack() {
    const { pathname } = useStackHandler(basePath, '/users')
    return false
    || !pathname.startsWith(basePath + '/') && <div/>
    || pathname.startsWith(basePath + '/users') && <UserRouter />
    || <NotFound />
}
AuthStack.basePack = basePath