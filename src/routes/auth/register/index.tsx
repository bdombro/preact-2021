import { Fragment, h } from 'preact';
import setPageMeta from '~/lib/routing/setPageMeta';
import { Paths } from '~/routes/router';

export default function Register() {
    setPageMeta({ title: 'Register' })
    const search = new URLSearchParams(location.search)
    search.set('replace', 'true')
    const searchStr = '?' + search.toString()
    return <Fragment>
        <h1>Register</h1>
        <ul>
            <li><a href='/admin'>Register as Admin</a></li>
            <li><a href='/tenant'>Register as Tenant</a></li>
            <li><a href={Paths.Login + searchStr}>Have a login?</a></li>
        </ul>
    </Fragment>
}