import { h } from 'preact';
import { lazy, Suspense } from 'preact/compat'

const PostList = lazy(() => import('./routes/PostList'))
const Post = lazy(() => import('./routes/Post'))

export default function UserRouter() {
    return (
        <Suspense fallback={<div/>}>{
            location.pathname === '/blog/posts' && <PostList />
            || <Post />
        }</Suspense>
    )
}