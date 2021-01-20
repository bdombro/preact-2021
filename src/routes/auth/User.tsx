import { h } from 'preact';

export default function UserRoute() {
    const userId = new URLSearchParams(location.search).get('id')
    return <div>
        <h1>Hello, User:{userId}!</h1>
        <ul>
            <li><a href={'/auth/user?id=' + Math.random()} >Random User</a></li>
            <li><a href={'?stack=back'}>Go Back</a></li>
        </ul>
        <br /><br /><br /><br /><br />1<br /><br /><br /><br /><br />2
        <br /><br /><br /><br /><br />3<br /><br /><br /><br /><br />4
        <br /><br /><br /><br /><br />5<br /><br /><br /><br /><br />6
        <br /><br /><br /><br /><br />7<br /><br /><br /><br /><br />8
        <div>Bottom</div>
    </div>
}