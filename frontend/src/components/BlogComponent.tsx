import {useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getFriendBlogDetails, getProfileDetails, sendFriendsList} from "../service/BlogService";
import SearchFriends from "./SearchFriends";
import {FriendItem} from "../service/Model";
import FriendComponent from "./FriendComponent";

interface BlogProps{
    username: string
    profilePicture: string
    profileDescription: string
 //   friendsList: Array<FriendItem>

}

export default function BlogComponent(props: BlogProps){
    const username = props.username
    const picture = props.profilePicture
    const description = props.profileDescription
  //  const friendlist = props.friendsList
 //   const [errorCode, setErrorCode] = useState("")



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
                {description}
            </div>
            <div>
                <img src={picture} alt="profile avatar"/>
            </div>

        </>
    )
}