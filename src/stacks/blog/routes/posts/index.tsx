import { lazy, Suspense } from 'react'

const PostList = lazy(() => import('./routes/PostList'))
const Post = lazy(() => import('./routes/Post'))

export default function UserRouter() {
    return (
        <Suspense fallback={<></>}>{
            location.pathname === '/blog/posts' && <PostList />
            || <Post />
        }</Suspense>
    )
}