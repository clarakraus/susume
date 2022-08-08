import {useEffect, useState} from "react";
import {editBlog, getProfileDetails} from "../service/BlogService";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

export default function EditBlogPage(){
    const [profileDescription, setDescription] = useState("")
    const [profilePicture, setPicture] = useState("")
    const [blogId, setBlogId] = useState("")
    const nav = useNavigate()

    useEffect(() =>{
        getProfileDetails()
            .then(data => {
                setDescription(data.profileDescription)
                setPicture(data.profilePicture)
                setBlogId(data.blogId)
            })
            .catch(() => nav("/"))
    }, [nav])

    const saveChanges = () => {
        editBlog({profileDescription, profilePicture}, blogId)
            .then(()=> nav("/profile"))

    }
    return(
        <>
            <div>
                <textarea placeholder={profileDescription} value={profileDescription} onChange={event => setDescription(event.target.value)}/>
            </div>
            <div>
                <input type={"text"} placeholder={profilePicture
                } value={profilePicture} onChange={event => setPicture(event.target.value)}/>
            </div>
            <div>
                <Button onClick={saveChanges}>save changes</Button>
                <Button onClick={() =>nav("/profile")} color={"inherit"}>Go Back</Button>
            </div>
        </>
    )
}