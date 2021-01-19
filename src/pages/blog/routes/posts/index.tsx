import { h } from 'preact';
import lazy from '~/components/lazy';

const PostList = lazy(() => import('./routes/PostList'))
const Post = lazy(() => import('./routes/Post'))

export default function UserRouter() {
    return false
    || location.pathname === '/blog/posts' && <PostList />
    || <Post />
}