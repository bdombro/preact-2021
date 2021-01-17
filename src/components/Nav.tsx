import './Nav.css'
import {useLocation} from "./routing"

export default function Nav() {
    return <nav className="nav">
        <NavLink uri='/about' text='About' />
        <NavLink uri='/auth' text='Auth' />
        <NavLink uri='/blog' text='Blog' />
    </nav>
}

function NavLink({uri, text}: {uri: string, text: string}) {
    const {pathname} = useLocation()
    const isActive = pathname.startsWith(uri)
    return (
        <a 
            href={uri + (isActive ? '?stack=reset' : '')}
            className={isActive ? 'active' : ''}
        >
            <div>{text}</div>
        </a>
    )

}