import { h } from 'preact';
import { Paths } from '../router';

export default function AboutRoute() {
    return <div>
        <h1>Hello, about page!</h1>
        <br /><br /><br /><br /><br />1<br /><br /><br /><br /><br />2
        <br /><br /><br /><br /><br />3<br /><br /><br /><br /><br />4
        <br /><br /><br /><br /><br />5<br /><br /><br /><br /><br />6
        <br /><br /><br /><br /><br />7<br /><br /><br /><br /><br />8
        <br /><br /><br /><br /><br />9<br /><br /><br /><br /><br />a
        <br /><br /><br /><br /><br />b<br /><br /><br /><br /><br />c
        <div>Bottom</div>
        <a href={Paths.AuthStack}>Goto Auth</a><br/>
        <a href={Paths.About}>Goto About</a>
    </div>
}