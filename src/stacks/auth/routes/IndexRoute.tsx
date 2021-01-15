export default function AuthIndex() {
    return <div>
        <p>Hello, auth!</p>
        <p><a href={'/blog'}>Goto Blog</a></p>
        <p><a href={`/blog?stack=reset`}>Goto Blog with Reset</a></p>
    </div>
}