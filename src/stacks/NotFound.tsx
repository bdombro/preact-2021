import useLocation from "../useLocation";

export default function NotFound() {
    const [location, navigate] = useLocation()
    return <div>
        <p>Route not found!</p>
        <a href="home" onClick={e => { e.preventDefault(); navigate('/') }}>Goto Home</a>
    </div>
}