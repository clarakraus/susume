
import BlogComponent from "../components/BlogComponent";
import MovieApiSearch from "../components/MovieApiSearch";
import SusumeGallery from "../components/SusumeGallery";
import {useNavigate, useParams} from "react-router-dom";
import WatchlistPage from "./WatchlistPage";
import {getFriendBlogDetails, getProfileDetails, sendFriendsList} from "../service/BlogService";
import {useEffect, useState} from "react";
import {FriendItem} from "../service/Model";
import SearchFriends from "../components/SearchFriends";
import FriendComponent from "../components/FriendComponent";


export default function Blog(){
    const {username} = useParams()
    const [profilePicture, setProfilePicture] = useState("")
    const [profileDescription, setProfileDescription] = useState("")
    const [friendList, setFriendList] = useState<Array<FriendItem>>([])
    const nav = useNavigate()


    function renderBlogComponent() {
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


    }
    useEffect(()=>{
        renderBlogComponent()
    }, [renderBlogComponent])


    const ListOfFriends = friendList.map(friend => <FriendComponent friendItem={{username:friend.username, profilePicture:friend.profilePicture, blogId: friend.blogId}}/>)



    return(
        <>
            <div>
                <header/>
            </div>
            <div>
                <BlogComponent username={username!} profilePicture={profilePicture} profileDescription={profileDescription} friendsList={friendList}/>
            </div>
            <div>
                <MovieApiSearch/>
            </div>
            <div>
                <SusumeGallery creatorName={username!}/>
            </div>
            <div>
                <SearchFriends renderBlog={renderBlogComponent}/>
            </div>
            <div>
                <WatchlistPage/>
            </div>
            <div>
                {ListOfFriends}
            </div>

        </>
    )

}