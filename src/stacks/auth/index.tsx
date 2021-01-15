import useLocation from '../../useLocation'
import NotFound from '../NotFound'
import IndexRoute from './routes/IndexRoute'
// import PostRoute from './routes/PostRoute'

const basePath = '/auth'
export default function StacksIndex() {
    const [location, navigate] = useLocation()

    return false
        || !location.startsWith(basePath) && <></>
        || location === basePath && <IndexRoute />
        || <NotFound />
}