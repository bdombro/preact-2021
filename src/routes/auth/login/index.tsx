import { h } from 'preact';

export default function Login() {
    return <div>
        <ul>
            <li><a href='/admin'>Login as Admin</a></li>
            <li><a href='/tenant'>Login as Tenant</a></li>
        </ul>
    </div>
}