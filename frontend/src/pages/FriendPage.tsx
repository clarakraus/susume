import BlogComponent from "../components/BlogComponent";
import {getFriendBlogDetails, getSusumes, getSusumesForFriendBlog} from "../service/BlogService";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {FriendItem} from "../service/Model";
import SusumeGallery from "../components/SusumeGallery";

export default function FriendPage(){

    const {username} = useParams()
    const [profilePicture, setProfilePicture] = useState("")
    const [profileDescription, setProfileDescription] = useState("")

   // const visitFriendBlog = () => {
    useEffect(()=>{
        if(username){
            getFriendBlogDetails(username)
                .then(data => {
                setProfilePicture(data.profilePicture)
                setProfileDescription(data.profileDescription!)
                return data
            })
                .then(()=> getSusumesForFriendBlog(username))


        }
    }, [username])



    return(
        <>
            <div>
                <BlogComponent blogName={username!}/>
            </div>
            <div>
                <SusumeGallery creatorName={username!}/>
            </div>
        </>
    )
}