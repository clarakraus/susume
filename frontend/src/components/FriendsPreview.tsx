import {Blog} from "../service/Model";
import "./FriendsPreview.css"
import {addFriend, getProfileDetails} from "../service/BlogService";

interface FriendsPreviewProps{
    blog: Blog
}

export default function FriendsPreview(props: FriendsPreviewProps){
    const friendsName = props.blog.username
    const friendsPicture = props.blog.profilePicture
    const friendsId = props.blog.blogId


    const addToFriendsList = () =>{
            addFriend(friendsId)
                .then(()=> getProfileDetails())
    }
return (
    <>
        <div>
            <img className="profilePicture" src={friendsPicture} width={40} alt={"user avatar"}/>
            {friendsName}
            <button onClick={addToFriendsList}>add as friend</button>
        </div>
        <div>

        </div>
    </>
    )

}