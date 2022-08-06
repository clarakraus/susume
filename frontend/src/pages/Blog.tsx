
import BlogComponent from "../components/BlogComponent";
import MovieApiSearch from "../components/MovieApiSearch";
import SusumeGallery from "../components/SusumeGallery";
import {NavLink, useNavigate, useParams} from "react-router-dom";

import {getProfileDetails, sendFriendsList} from "../service/BlogService";
import {useCallback, useEffect, useState} from "react";
import {FriendItem} from "../service/Model";
import SearchFriends from "../components/SearchFriends";
import FriendComponent from "../components/FriendComponent";
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import {TopNavBar} from "../components/TopNavBar";
import Sidebar from "../components/Sidebar";



export default function Blog(){
    const {username} = useParams()
    const [profilePicture, setProfilePicture] = useState("")
    const [profileDescription, setProfileDescription] = useState("")
    const [friendList, setFriendList] = useState<Array<FriendItem>>([])
    const nav = useNavigate()


   const renderBlogComponent = useCallback(() => {
        if (!username){
            getProfileDetails()
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
        else {
            nav(`/profile/${username}`)
        }


          /*  getFriendBlogDetails(username!)
                .then(data => {
                    setProfilePicture(data.profilePicture)
                    setProfileDescription(data.profileDescription!)
                    return data
                })
                .then((data) => {
                    sendFriendsList(data.friendsList!)
                        .then(data => setFriendList(data))
                })

           */

    }, [username, nav])




    useEffect(()=>{
        renderBlogComponent()
    }, [renderBlogComponent])


    const ListOfFriends = friendList.map(friend => <FriendComponent friendItem={{username:friend.username, profilePicture:friend.profilePicture, blogId: friend.blogId}}/>)



    return(
        <>
            <div>
                <TopNavBar/>
            </div>
            <div>
                <BlogComponent username={username!} profilePicture={profilePicture} profileDescription={profileDescription} />
            </div>
            <NavLink to={"/profile/edit/blog"}><div>
                <button>edit profile</button>
            </div>
            </NavLink>
            <div>
                <MovieApiSearch/>
            </div>
            <div>
                <SusumeGallery  addToSaveList={false} creatorName={username!} privateList={false} hasDeleteButton={false} shownOnOwnBlog={true}  />
            </div>
            <div>
                <SearchFriends renderBlog={renderBlogComponent}/>
            </div>
            <div>
                <Sidebar/>
            </div>

            <div>
                {ListOfFriends}
            </div>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                >
                    <BottomNavigationAction label="Watchlist" onClick={() => nav("/profile/watchlist")}/>
                    <BottomNavigationAction label="Friends" />
                    <BottomNavigationAction label="Edit profile" onClick={() => nav("/profile/edit/blog")}/>
                </BottomNavigation>
            </Paper>
        </>
    )

}