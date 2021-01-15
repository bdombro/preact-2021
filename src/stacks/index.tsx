import { useEffect } from 'react'
import useLocation from '../useLocation'
import AboutRoute from './About'
import AuthStack from './auth/index'
import BlogStack from './blog/index'
import NotFound from './NotFound'

export default function StacksIndex() {
    const [location, navigate] = useLocation()

    useEffect(() => {
        if (location === '/') navigate('/blog')
    }, [location, navigate])

    return <>
        <AuthStack />
        <BlogStack />
        {location === '/about' && <AboutRoute />}
        {!['auth', 'blog', 'about'].includes(location.split('/')?.[1]) && <NotFound/>}
    </>
}