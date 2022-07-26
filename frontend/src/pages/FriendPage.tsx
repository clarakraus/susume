import BlogComponent from "../components/BlogComponent";
import {useNavigate, useParams} from "react-router-dom";
import SusumeGallery from "../components/SusumeGallery";
import {getFriendBlogDetails, getProfileDetails, sendFriendsList} from "../service/BlogService";
import {useEffect, useState} from "react";
import {FriendItem} from "../service/Model";
import FriendComponent from "../components/FriendComponent";

export default function FriendPage(){

    const {username} = useParams()
    const [profilePicture, setProfilePicture] = useState("")
    const [profileDescription, setProfileDescription] = useState("")
    const [friendList, setFriendList] = useState<Array<FriendItem>>([])
    const nav = useNavigate()

    useEffect( () =>{
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
    })
    const ListOfFriends = friendList.map(friend => <FriendComponent friendItem={{username:friend.username, profilePicture:friend.profilePicture, blogId: friend.blogId}}/>)


    return(
        <>
            <div>
                <BlogComponent username={username!} profileDescription={profileDescription}  profilePicture={profilePicture} friendsList={friendList}/>
            </div>
            <div>
                {ListOfFriends}
            </div>
            <div>
                <SusumeGallery creatorName={username!}/>
            </div>
        </>
    )
}