import { lazy, Suspense } from 'react'
import { useStackHandler } from '../../components/routing'

import PostRouter from './routes/posts'

const NotFound = lazy(() => import('../NotFound'))

const basePath = '/blog'
export default function BlogStack() {
    const { pathname } = useStackHandler(basePath, '/posts')
    return (
        <Suspense fallback={<></>}>{
            !pathname.startsWith(basePath + '/') && <></>
            || pathname === basePath && <></>
            || pathname.startsWith(basePath + '/posts') && <PostRouter />
            || <NotFound />
        }</Suspense>
    )
}
BlogStack.basePath = basePath