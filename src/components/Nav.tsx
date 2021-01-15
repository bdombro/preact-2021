import './Nav.css'
import useLocation from "../hooks/useLocation"

export default function Nav() {
    return <nav className="nav">
        <NavLink uri='/about' text='About' />
        <NavLink uri='/auth' text='Auth' />
        <NavLink uri='/blog' text='Blog' />
    </nav>
}

function NavLink({uri, text}: {uri: string, text: string}) {
    const [location] = useLocation()
    const isActive = location.startsWith(uri)
    return (
        <a 
            href={uri + (isActive ? '?stack=reset' : '')}
            className={isActive ? 'active' : ''}
        >
            <div>{text}</div>
        </a>
    )

}