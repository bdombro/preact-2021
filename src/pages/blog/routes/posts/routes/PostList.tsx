import { h } from 'preact';

export default function BlogIndex() {
    return <div>
        <h1>Hello, blog index!</h1>
        <ul>
            <li><a href={'/blog/posts/' + Math.random()} >Random Post</a></li>
        </ul>
    </div>
}