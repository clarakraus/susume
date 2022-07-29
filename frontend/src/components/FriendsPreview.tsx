import {Blog, FriendItem} from "../service/Model";
import "./FriendsPreview.css"
import {addFriend} from "../service/BlogService";
import {useNavigate} from "react-router-dom";

interface FriendsPreviewProps{
    blog: FriendItem
    renderBlog: Function
    setFriendsName: Function
}

export default function FriendsPreview(props: FriendsPreviewProps){
    const friendsName = props.blog.username
    const friendsPicture = props.blog.profilePicture
    const friendsId = props.blog.blogId
    const nav = useNavigate()

    const addToFriendsList = () =>{
            addFriend(friendsId)
                .then(() => props.renderBlog())
                .then(() => props.setFriendsName(""))
                .then(() => nav("/profile"))
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