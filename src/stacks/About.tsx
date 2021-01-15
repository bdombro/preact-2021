import useLocation from "../useLocation";

export default function AboutStack() {
    const [location, navigate] = useLocation()
    return <div>
        <p>Hello, About!</p>
        <p><a href="post" onClick={e => { e.preventDefault(); navigate('/blog/' + Math.random()) }}>Goto Random post</a></p>
        <p><a href="auth" onClick={e => { e.preventDefault(); navigate('/auth') }}>Goto Auth</a></p>
    </div>
}