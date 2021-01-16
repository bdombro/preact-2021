import React, { lazy, Suspense } from 'react'
import useStackHandler from '../../hooks/useStackHandler'

const IndexRoute = lazy(() => import('./routes/IndexRoute'))
const PostRoute = lazy(() => import('./routes/PostRoute'))

const basePath = '/blog'
export default function BlogStack() {
    const {pathname} = useStackHandler(basePath)
    return (
        <Suspense fallback={<></>}>{
            !pathname.startsWith(basePath) && <></>
            || pathname === basePath && <IndexRoute />
            || <PostRoute />
        }</Suspense>
    )
}
BlogStack.basePath = basePath