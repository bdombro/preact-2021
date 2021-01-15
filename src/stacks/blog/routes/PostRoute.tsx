import useLocation from "../../../useLocation"

export default function PostRoute() {
    const [location] = useLocation()
    const postId = location.split('/')[2]
    return <div>
        <p>Hello, {postId}!</p>
        <p><a href={'/blog/' + Math.random()} >Goto Random Post</a></p>
        <p><a href={'/blog?stack=reset'}>Goto Blog root</a></p>
        <p><a href={'/auth'}>Goto Auth</a></p>
        <p><a href={'/blog?stack=back'}>Go Back</a></p>
        <br /><br /><br /><br /><br />1<br /><br /><br /><br /><br />2<br /><br /><br /><br /><br /><br />3<br /><br /><br /><br /><br />4<br /><br /><br /><br />5<br /><br /><br /><br />6
        <div>Bottom</div>
    </div>
}