import { h } from 'preact';
import { Paths } from '../router';

export default function BlogIndex() {
    return <div>
        <h1>Hello, post list!</h1>
        <ul>
            <li><a href={Paths.BlogPost +'?id=' + Math.random()} >Random Post 1</a></li>
            <li><a href={Paths.BlogPost +'?id=' + Math.random()} >Random Post 2</a></li>
            <li><a href={Paths.BlogPost +'?id=' + Math.random()} >Random Post 3</a></li>
            <li><a href={'?stack=back'}>Go Back</a></li>
        </ul>
    </div>
}