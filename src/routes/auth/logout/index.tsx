import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { navigate } from '~/lib/routing';

export default function Logout() {
    useEffect(() => {navigate('/', {replace: true})})
    return <div/>
}