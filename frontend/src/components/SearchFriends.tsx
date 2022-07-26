import {useEffect, useState} from "react";
import {searchFriend} from "../service/BlogService";
import {FriendItem} from "../service/Model";
import FriendsPreview from "./FriendsPreview";

export default function SearchFriends(){
    const[friendsName, setFriendsName] = useState("")
    const[message, setMessage] = useState("")
    const [friendArray, setFriendArray] = useState<Array<FriendItem>>([])
    const friendSearchList = friendArray.map(friend =><FriendsPreview blog={friend}/>)


   useEffect(()=>{
       if(friendsName){
       searchFriend(friendsName)
           .then((data) => setFriendArray(data))
           .catch(() => setMessage('username not found'))

    }}, [friendsName])


    return(
        <>
            <div>
                {message && <div>{message}</div>}
            </div>
            <div>
                <input type="text" placeholder="username" value={friendsName}
                       onChange={ev => setFriendsName(ev.target.value)}/>
                <button type="submit">search</button>
            </div>
            <div>
                {friendSearchList}
            </div>
        </>

    )

}