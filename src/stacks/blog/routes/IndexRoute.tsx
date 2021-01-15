export default function BlogIndex() {
    return <div>
        <p>Hello, blog!</p>
        <p><a href={'/blog/' + Math.random()}>Goto Random post</a></p>
        <p><a href={'/auth'}>Goto Auth</a></p>
    </div>
}