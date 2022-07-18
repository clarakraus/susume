import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getProfileDetails} from "../service/BlogService";
import SearchFriends from "./SearchFriends";

export default function BlogComponent(){

    const {username} = useParams()
    const [profilePicture, setProfilePicture] = useState("")
    const [profileDescription, setProfileDescription] = useState("")
    const [listOfFriends, setListOfFriends]= useState<Array<string>>([])

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