import useLocation from "../../../useLocation"

export default function AuthIndex() {
    const [location, navigate] = useLocation()
    return <div>
        <p>Hello, auth!</p>
        <p><a href="blog" onClick={e => { e.preventDefault(); navigate('/blog') }}>Goto Blog</a></p>
        <p><a href="blog/reset" onClick={e => { e.preventDefault(); navigate('/blog?stack=reset') }}>Goto Blog with Reset</a></p>
    </div>
}