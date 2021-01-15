import { lazy, Suspense } from 'react'
import useStackHandler from '../../hooks/useStackHandler'

const IndexRoute = lazy(() => import('./routes/IndexRoute'))
const UserRoute = lazy(() => import('./routes/UserRoute'))

const basePath = '/auth'
export default function StacksIndex() {
    const [location] = useStackHandler(basePath)

    return (
        <Suspense fallback={<></>}>
            {
                !location.startsWith(basePath) && <></>
                || location === basePath && <IndexRoute />
                || <UserRoute />
            }
        </Suspense>
    )       
}