import React, { lazy, Suspense } from 'react'
import useStackHandler from '../../hooks/useStackHandler'
import useLocation from '../../hooks/useLocation'

const IndexRoute = lazy(() => import('./routes/IndexRoute'))
const PostRoute = lazy(() => import('./routes/PostRoute'))

const basePath = '/blog'
export default function StacksIndex() {
    useStackHandler(basePath)
    const [location] = useLocation()

    return (
        <Suspense fallback={<></>}>
            {
                !location.startsWith(basePath) && <></>
                || location === basePath && <IndexRoute />
                || <PostRoute />
            }
        </Suspense>
    )
}