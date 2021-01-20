import { h } from 'preact';

export default function BlogIndex() {
    return <div>
        <h1>Hello, post index!</h1>
        <ul>
            <li><a href={'/blog/posts'} >Goto posts</a></li>
        </ul>
    </div>
}