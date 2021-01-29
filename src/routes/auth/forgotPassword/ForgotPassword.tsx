import { Fragment as F, h } from 'preact';
import setPageMeta from '~/layout/routing/setPageMeta';
import { Paths } from '~/routes/router';

export default function ForgotPassword() {
    setPageMeta({ title: 'Forgot Password' })
    const search = new URLSearchParams(location.search)
    search.set('replace', 'true')
    const searchStr = '?' + search.toString()
    return <F>
        <h1>Forgot Password</h1>
        <ul>
            <li><a href={Paths.Login + searchStr}>Go back to Login</a></li>
        </ul>
    </F>
}