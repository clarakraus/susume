import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getProfileDetails, sendFriendsList} from "../service/BlogService";
import SearchFriends from "./SearchFriends";
import FriendsPreview from "./FriendsPreview";
import {FriendItem} from "../service/Model";

export default function BlogComponent(){

    const {username} = useParams()
    const [profilePicture, setProfilePicture] = useState("")
    const [profileDescription, setProfileDescription] = useState("")
    const [friendList, setFriendList] = useState<Array<FriendItem>>([])


    useEffect(()=>{
        if (username){
            getProfileDetails(username)
                .then(data => {
                    setProfilePicture(data.profilePicture)
                    setProfileDescription(data.profileDescription!)
                    return data
                })

                .then((data) => sendFriendsList(data.friendsList!)
                    .then(data => setFriendList(data)))
        }
    }, [username])




    const ListOfFriends = friendList.map(friend => <FriendsPreview blog={{username:friend.username, profilePicture:friend.profilePicture, blogId: friend.blogId}}/>)
    console.log(friendList)

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
                <SearchFriends/>
            </div>
            <div>
                friends {ListOfFriends}
            </div>
        </>
    )
}