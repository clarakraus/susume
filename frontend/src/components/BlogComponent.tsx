import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getProfileDetails} from "../service/BlogService";
import {Blog} from "../service/Model";

export default function BlogComponent(){

    const {username} = useParams()
    const [profilePicture, setProfilePicture] = useState("")
    const [profileDescription, setProfileDescription] = useState("")
    const [blogObject, setBlogObject] = useState({} as Blog)

    useEffect(()=>{
        if (username){
            getProfileDetails(username)
                .then(data => setBlogObject(data))
                .then(() => {
                    setProfilePicture(blogObject.profilePicture)
                    setProfileDescription(blogObject.profileDescription)
                })
        }
    }, [username, blogObject])


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
        </>
    )
}