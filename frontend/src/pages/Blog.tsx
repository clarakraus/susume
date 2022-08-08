
import MovieApiSearch from "../components/MovieApiSearch";
import SusumeGallery from "../components/SusumeGallery";
import {useNavigate, useParams} from "react-router-dom";

import {getProfileDetails, sendFriendsList} from "../service/BlogService";
import {useCallback, useEffect, useState} from "react";
import {FriendItem} from "../service/Model";
import SearchFriends from "../components/SearchFriends";
import FriendComponent from "../components/FriendComponent";
import {TopNavBar} from "../components/TopNavBar";
import "./AccordionMenu.css"
import "./Blog.css"
import {Avatar} from "@mui/material";




export default function Blog(){
    const {username} = useParams()
    const [profilePicture, setProfilePicture] = useState("")
    const [profileDescription, setProfileDescription] = useState("")
    const [friendList, setFriendList] = useState<Array<FriendItem>>([])
    const [blogName, setBlogName] = useState("")
    const nav = useNavigate()


   const renderBlogComponent = useCallback(() => {
        if (!username){
            getProfileDetails()
                .then(data => {
                    setBlogName(data.username)
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
            nav(`/profile/${username}`)
        }

    }, [username, nav])




    useEffect(()=>{
        renderBlogComponent()
    }, [renderBlogComponent])


    const ListOfFriends = friendList.map(friend => <FriendComponent friendItem={{username:friend.username, profilePicture:friend.profilePicture, blogId: friend.blogId}}/>)



    return(
        <>
            <TopNavBar/>
            <div className="container">
                <nav className="menu">
                    <div className={"friendBar"}>
                        <div className={"detailsDiv"}>
                            <Avatar src={profilePicture} alt="profile avatar" sx={{ width: 100, height: 100 }}/>
                            <p>{blogName}</p>
                        </div>
                        <div className={"detailsDiv"}>
                            {profileDescription}
                        </div>
                        <hr/>
                        <div className={"friendSection"}>
                            <SearchFriends renderBlog={renderBlogComponent}/>
                            {ListOfFriends}
                        </div>
                    </div>
                </nav>
                <main className={"blogMain"}>
                    <div className={"susumeGallery"}>
                        <MovieApiSearch/>
                        <SusumeGallery  addToSaveList={false} creatorName={username!} privateList={false} hasDeleteButton={false} shownOnOwnBlog={true}  />
                    </div>
                </main>
            </div>



        </>
    )

}