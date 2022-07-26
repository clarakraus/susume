import {useEffect, useState} from "react";
import {searchFriend} from "../service/BlogService";
import {FriendItem} from "../service/Model";
import FriendsPreview from "./FriendsPreview";

interface BlogComponentProps{
    renderBlog: Function
}


export default function SearchFriends(props: BlogComponentProps){
    const[friendsName, setFriendsName] = useState("")
    const[message, setMessage] = useState("")
    const [friendArray, setFriendArray] = useState<Array<FriendItem>>([])
    const friendSearchList = friendArray.map(friend =><FriendsPreview setFriendsName={setFriendsName} renderBlog={props.renderBlog}  blog={friend}/>)


   useEffect(()=>{
       if(friendsName){
       searchFriend(friendsName)
           .then((data) => setFriendArray(data))
           .catch(() => setMessage('username not found'))

    } else{
           setFriendArray([])
       }
       }, [friendsName])


    return(
        <>
            <div>
                {message && <div>{message}</div>}
            </div>
            <div>
                <input type="text" placeholder="username" value={friendsName}
                       onChange={ev => setFriendsName(ev.target.value)}/>
            </div>
            <div>
                {friendSearchList}
            </div>
        </>

    )

}