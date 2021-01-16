export default function AuthIndex() {
    return <div>
        <h3>Hello, auth page!</h3>
        <ul>
            <li><a href={'/auth/' + Math.random()} >Random User</a></li>
        </ul>
    </div>
}