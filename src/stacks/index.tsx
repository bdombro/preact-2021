import { useEffect } from 'react'
import useLocation from '../useLocation'
import AboutRoute from './About'
import AuthStack from './auth/index'
import BlogStack from './blog/index'
import NotFound from './NotFound'

export default function StacksIndex() {
    const [location, navigate] = useLocation()
    
    let stack = location.split('/')[1] || '/'
    if (!['/', 'auth', 'blog', 'about'].includes(stack)) stack = 'default'

    useEffect(() => {
        if (location === '/') navigate('/blog')
    }, [location, navigate])

    return <>
        <div style={{display: stack === 'auth' ? 'block' : 'none'}}><AuthStack /></div>
        <div style={{ display: stack === 'blog' ? 'block' : 'none' }}><BlogStack /></div>
        <div style={{ display: stack === 'about' ? 'block' : 'none' }}><AboutRoute /></div>
        <div style={{ display: stack === 'default' ? 'block' : 'none' }}><NotFound /></div>
    </>
}