import { h } from 'preact';

export default function PostRoute() {
    const postId = location.pathname.split('/')[3]
    return <div>
        <h3>Hello, Post:{postId}!</h3>
        <ul>
            <li><a href={'/blog/posts/' + Math.random()} >Random Post</a></li>
            <li><a href={'?stack=back'}>Go Back</a></li>
        </ul>
        <br /><br /><br /><br /><br />1<br /><br /><br /><br /><br />2
        <br /><br /><br /><br /><br />3<br /><br /><br /><br /><br />4
        <br /><br /><br /><br /><br />5<br /><br /><br /><br /><br />6
        <br /><br /><br /><br /><br />7<br /><br /><br /><br /><br />8
        <div>Bottom</div>
    </div>
}