import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getProfileDetails} from "../service/BlogService";
import SearchFriends from "./SearchFriends";
import FriendsPreview from "./FriendsPreview";

export default function BlogComponent(){

    const {username} = useParams()
    const [profilePicture, setProfilePicture] = useState("")
    const [profileDescription, setProfileDescription] = useState("")
    const [friendsArray, setFriendsArray]= useState<Array<string>>([])
    const ListOfFriends = friendsArray.map(friend => <FriendsPreview blog={friend}/>)

    useEffect(()=>{
        if (username){
            getProfileDetails(username)
                .then(data => {
                    setProfilePicture(data.profilePicture)
                    setProfileDescription(data.profileDescription)
                    setListOfFriends(data.friendsList)
                })
        }
    }, [username])


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
                friends {listOfFriends}
            </div>
        </>
    )
}