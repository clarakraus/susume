
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
            <TopNavBar profilePicture={profilePicture} blogName={blogName} profileDescription={profileDescription}/>
            <div className="container">
                <nav className="menu">
                    <div className={"friendBar"}>
                        <SearchFriends renderBlog={renderBlogComponent}/>
                        <div>
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