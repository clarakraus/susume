import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getProfileDetails} from "../service/BlogService";
import {Blog} from "../service/Model";

export default function BlogComponent(){

    const {username} = useParams()
    const [profileName, setProfileName] = useState(username)
    const [profilePicture, setProfilePicture] = useState("")
    const [profileDescription, setProfileDescription] = useState("")
    const [blogObject, setBlogObject] = useState({} as Blog)

    useEffect(()=>{
        if (username){
            getProfileDetails(username)
                .then(data => setBlogObject(data))
                .then(() => {
                    setProfileName(username)
                    setProfilePicture(blogObject.profilePicture)
                    setProfileDescription(blogObject.profileDescription)
                })
        }
    }, [profileName, profileDescription, profilePicture])


    return(
        <>
            <div>
                {profileName}
            </div>
            <div>
                {profileDescription}
            </div>
            <div>
                <img src={profilePicture} alt="profile picture"/>
            </div>
        </>
    )
}