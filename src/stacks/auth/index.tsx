import useLocation from '../../useLocation'
import NotFound from '../NotFound'
import IndexRoute from './routes/IndexRoute'
// import PostRoute from './routes/PostRoute'

export default function StacksIndex() {
    const [location, navigate] = useLocation()

    let stack = location.split('/')?.[2] ?? '/'
    if (!['/'].includes(stack)) stack = 'default'

    return <>
        <div style={{ display: stack === '/' ? 'block' : 'none' }}><IndexRoute /></div>
        <div style={{ display: stack === 'default' ? 'block' : 'none' }}><NotFound /></div>
    </>
}