import React, { lazy, Suspense } from 'react'
import useStackHandler from '../../hooks/useStackHandler'

const IndexRoute = lazy(() => import('./routes/IndexRoute'))
const PostRoute = lazy(() => import('./routes/PostRoute'))

const basePath = '/blog'
export default function StacksIndex() {
    const [location] = useStackHandler(basePath)

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