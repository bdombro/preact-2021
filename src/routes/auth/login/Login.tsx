import { Fragment, h } from 'preact';
import { useLayoutEffect } from 'preact/hooks';
import setPageMeta from '~/layout/routing/setPageMeta';
import { Paths } from '~/routes/router';

export default function Login() {
    setPageMeta({ title: 'Login' })
    const search = new URLSearchParams(location.search)
    search.set('replace', 'true')
    const searchStr = '?' + search.toString()

    return <Fragment>
        <h1>Login</h1>
        <ul>
            <li><a href='/admin'>Login as Admin</a></li>
            <li><a href='/tenant'>Login as Tenant</a></li>
            <li><a href={Paths.Register + searchStr}>Want to register?</a></li>
            <li><a href={Paths.ForgotPassword + searchStr}>Forgot your password?</a></li>
        </ul>
    </Fragment>
}