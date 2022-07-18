import {Blog} from "../service/Model";
import "./FriendsPreview.css"

interface FriendsPreviewProps{
    blog: Blog
}

export default function FriendsPreview(props: FriendsPreviewProps){
    const friendsName = props.blog.username
    const friendsPicture = props.blog.profilePicture
return (
        <div>
            <img className="profilePicture" src={friendsPicture} width={40} alt={"user avatar"}/>
            {friendsName}
        </div>
    )

}