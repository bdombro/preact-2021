export default function AboutStack() {
    return <div>
        <p>Hello, About!</p>
        <p><a href={'/blog/' + Math.random()}>Goto Random post</a></p>
        <p><a href={'/auth'}>Goto Auth</a></p>
    </div>
}