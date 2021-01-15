import { lazy, Suspense } from 'react'
import useStackHandler from '../../hooks/useStackHandler'
import NotFound from '../NotFound'

const IndexRoute = lazy(() => import('./routes/IndexRoute'))

const basePath = '/auth'
export default function StacksIndex() {
    const [location] = useStackHandler(basePath)

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