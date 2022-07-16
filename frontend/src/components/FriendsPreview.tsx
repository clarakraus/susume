import {Blog} from "../service/Model";

interface FriendsPreviewProps{
    blog: Blog
}

export default function(props: FriendsPreviewProps){
    const friendsName = props.blog.profileName
    const friendsPicture = props.blog.profilePicture
return (
        <div>
            {friendsName}
            {friendsPicture}
        </div>
    )

}