import BlogComponent from "../components/BlogComponent";
import {useNavigate, useParams} from "react-router-dom";
import SusumeGallery from "../components/SusumeGallery";
import {getFriendBlogDetails, sendFriendsList} from "../service/BlogService";
import React, {useCallback, useEffect, useState} from "react";
import {FriendItem} from "../service/Model";
import FriendComponent from "../components/FriendComponent";
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import "./FriendPage.css"

export default function FriendPage(){

    const {username} = useParams()
    const [profilePicture, setProfilePicture] = useState("")
    const [profileDescription, setProfileDescription] = useState("")
    const [friendList, setFriendList] = useState<Array<FriendItem>>([])
    const nav = useNavigate()

    const refreshFriendsBlog = useCallback(()=> {
        if(username){
            getFriendBlogDetails(username)
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
    }, [username, nav])

    useEffect( () =>{
        refreshFriendsBlog()
    }, [refreshFriendsBlog])

    const ListOfFriends = friendList.map(friend => <FriendComponent friendItem={{username:friend.username, profilePicture:friend.profilePicture, blogId: friend.blogId}}/>)


    return(
        <>
            <div className={"blogOrganization"}>
                <div >
                    <div className={"blogInfo"}>
                        <BlogComponent username={username!} profileDescription={profileDescription}  profilePicture={profilePicture}/>
                    </div>
                </div>
                <hr/>
                <div className={"friendAndSusumes"}>
                    <div >
                        {ListOfFriends}
                    </div>
                    <div>
                        <SusumeGallery  addToSaveList={true} creatorName={username!} privateList={false} hasDeleteButton={false} shownOnOwnBlog={false} />
                    </div>
                </div>
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                    <BottomNavigation
                        showLabels
                    >
                        <BottomNavigationAction label="blog" onClick={() => nav("/profile")}/>
                        <BottomNavigationAction label="Friends" />
                        <BottomNavigationAction label="Edit profile" onClick={() => nav("/profile/edit/blog")}/>
                    </BottomNavigation>
                </Paper>
            </div>

        </>
    )
}