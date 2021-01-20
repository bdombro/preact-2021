import { h } from 'preact';
import { Paths } from '../router';

export default function BlogIndex() {
    return <div>
        <h1>Hello, post index!</h1>
        <ul>
            <li><a href={Paths.BlogPosts} >Goto posts</a></li>
        </ul>
    </div>
}