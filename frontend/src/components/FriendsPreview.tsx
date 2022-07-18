import {Blog} from "../service/Model";

interface FriendsPreviewProps{
    blog: Blog
}

export default function FriendsPreview(props: FriendsPreviewProps){
    const friendsName = props.blog.username
    const friendsPicture = props.blog.profilePicture
return (
        <div>
            <img src={friendsPicture} width={40} alt={"user avatar"}/>
            {friendsName}
        </div>
    )

}