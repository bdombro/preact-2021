import { h } from 'preact';

export default function AuthIndex() {
    return <div>
        <h1>Hello, user list!</h1>
        <ul>
            <li><a href={'/auth/user?id=' + Math.random()} >Random User 1</a></li>
            <li><a href={'/auth/user?id=' + Math.random()} >Random User 2</a></li>
            <li><a href={'/auth/user?id=' + Math.random()} >Random User 3</a></li>
            <li><a href={'?stack=back'}>Go Back</a></li>
        </ul>
    </div>
}