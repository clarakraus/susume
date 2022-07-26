import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getFriendBlogDetails, getProfileDetails, sendFriendsList} from "../service/BlogService";
import SearchFriends from "./SearchFriends";
import {FriendItem} from "../service/Model";
import FriendComponent from "./FriendComponent";

//interface BlogNameProps{
//    blogName: string
//}

export default function BlogComponent(){

    const {username} = useParams()
    const [profilePicture, setProfilePicture] = useState("")
    const [profileDescription, setProfileDescription] = useState("")
    const [friendList, setFriendList] = useState<Array<FriendItem>>([])
    const nav = useNavigate()
 //   const [errorCode, setErrorCode] = useState("")

function renderBlogComponent() {
    if (!username){
        getProfileDetails()
            .then(data => {
                setProfilePicture(data.profilePicture)
                setProfileDescription(data.profileDescription!)
                return data
            })

            .then((data) => {
                sendFriendsList(data.friendsList!)
                    .then(data => setFriendList(data))
            })
            .catch((e) => {
                if(e.response.status === 403){
                    nav("/")
                }
            })

    }
    else {
        getFriendBlogDetails(username!)
            .then(data => {
                setProfilePicture(data.profilePicture)
                setProfileDescription(data.profileDescription!)
                return data
            })
            .then((data) => {
                sendFriendsList(data.friendsList!)
                    .then(data => setFriendList(data))
            })
    }


}

    useEffect(()=>{
        renderBlogComponent()
    }, [])




    const ListOfFriends = friendList.map(friend => <FriendComponent friendItem={{username:friend.username, profilePicture:friend.profilePicture, blogId: friend.blogId}}/>)


   /* useEffect(() =>{
        if(friendList.length > 0){
            sendFriendsList(friendsArray)
                .then(data => setFriendList(data))

        }

    }, [friendList])

    */
    return(
        <>
            <div>
                {username}
            </div>
            <div>
                {profileDescription}
            </div>
            <div>
                <img src={profilePicture} alt="profile avatar"/>
            </div>
            <div>
                <SearchFriends renderBlog={renderBlogComponent}/>
            </div>
            <div>
                friends {ListOfFriends}
            </div>
        </>
    )
}