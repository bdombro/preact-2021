import { h } from 'preact';
import setPageMeta from '~/lib/routing/setPageMeta';

export default function FillerEntryFactory(name: string) {
    return () => {
        const id = new URLSearchParams(location.search).get('id')
        setPageMeta({ title: `${name} ${id}` })
        return <div style={{padding: "0 10px"}}>
            <h1>Hello, {name}:{id}!</h1>
            <ul>
                <li><a href={location.pathname + '?id=' + Math.random()} >Random Post</a></li>
                <li><a href={'?stack=back'}>Go Back</a></li>
            </ul>
            <br /><br /><br /><br /><br />1<br /><br /><br /><br /><br />2
            <br /><br /><br /><br /><br />3<br /><br /><br /><br /><br />4
            <br /><br /><br /><br /><br />5<br /><br /><br /><br /><br />6
            <br /><br /><br /><br /><br />7<br /><br /><br /><br /><br />8
            <div>Bottom</div>
        </div>
    }
}