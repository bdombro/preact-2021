import { lazy, Suspense } from 'react'
import { useStackHandler } from '../../components/routing'

import PostRouter from './routes/posts'

const NotFound = lazy(() => import('../NotFound'))

const basePath = '/blog'
export default function BlogStack() {
    const { pathname } = useStackHandler(basePath, '/posts')
    return (
        <Suspense fallback={<div/>}>{
            !pathname.startsWith(basePath + '/') && <div/>
            || pathname === basePath && <div/>
            || pathname.startsWith(basePath + '/posts') && <PostRouter />
            || <NotFound />
        }</Suspense>
    )
}
BlogStack.basePath = basePath