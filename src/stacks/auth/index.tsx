import { lazy, Suspense } from 'react'
import useLocation from '../../useLocation'
import NotFound from '../NotFound'

const IndexRoute = lazy(() => import('./routes/IndexRoute'))

const basePath = '/auth'
export default function StacksIndex() {
    const [location, navigate] = useLocation()

    return (
        <Suspense fallback={<></>}>
            {
                !location.startsWith(basePath) && <></>
                || location === basePath && <IndexRoute />
                || <NotFound />
            }
        </Suspense>
    )       
}