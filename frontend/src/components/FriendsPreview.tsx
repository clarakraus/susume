import {Blog} from "../service/Model";
import "./FriendsPreview.css"
import {useParams} from "react-router-dom";
import {addFriend} from "../service/BlogService";

interface FriendsPreviewProps{
    blog: Blog
}

export default function FriendsPreview(props: FriendsPreviewProps){
    const friendsName = props.blog.username
    const friendsPicture = props.blog.profilePicture
    const friendsId = props.blog.blogId
//    const friendsList = props.blog.friendsList
    const {username} = useParams();

    const addToFriendsList = () =>{
        if(username) {
            addFriend(friendsId, username)
        }
    }
    console.log(friendsPicture)
return (
    <>
        <div>
            <img className="profilePicture" src={props.blog.profilePicture} width={40} alt={"user avatar"}/>
            {friendsName}
            <button onClick={addToFriendsList}>add as friend</button>
        </div>
        <div>

        </div>
    </>
    )

}