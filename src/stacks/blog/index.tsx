import { h } from 'preact';
import lazy from '~/components/lazy';
import { useStackHandler } from '~/components/routing'

import PostRouter from './routes/posts'

const NotFound = lazy(() => import('../NotFound'))

const basePath = '/blog'
export default function BlogStack() {
    const { pathname } = useStackHandler(basePath, '/posts')
    return false
    || !pathname.startsWith(basePath + '/') && <div/>
    || pathname === basePath && <div/>
    || pathname.startsWith(basePath + '/posts') && <PostRouter />
    || <NotFound />
}
BlogStack.basePath = basePath