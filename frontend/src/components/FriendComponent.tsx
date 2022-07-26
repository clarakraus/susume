import {FriendItem} from "../service/Model";
import {NavLink} from "react-router-dom";

interface FriendItemProps{
    friendItem: FriendItem
}

export default function FriendComponent(props:FriendItemProps){



    return(

        <NavLink to={`/profile/${props.friendItem.username}`}>
            <div>
                <img src={props.friendItem.profilePicture} alt="profile avatar" width="40"/>
                {props.friendItem.username}
            </div>
        </NavLink>
    )






}
