import { h } from 'preact';

export default function AuthIndex() {
    return <div>
        <h1>Hello, auth index!</h1>
        <ul>
            <li><a href={'/auth/users/' + Math.random()} >Random User</a></li>
        </ul>
    </div>
}