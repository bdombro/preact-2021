import { h } from 'preact';
import { Paths } from '../router';

export default function AuthIndex() {
    return <div>
        <h1>Hello, auth index!</h1>
        <ul>
            <li><a href={Paths.AuthUsers} >User list</a></li>
        </ul>
    </div>
}