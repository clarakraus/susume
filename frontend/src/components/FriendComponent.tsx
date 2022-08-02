import {FriendItem} from "../service/Model";
import {NavLink} from "react-router-dom";
import {Avatar} from "@mui/material";
import "./FriendComponent.css"


interface FriendItemProps{
    friendItem: FriendItem
}

export default function FriendComponent(props:FriendItemProps){


    return(

        <NavLink className={"friendAlign"} to={`/profile/${props.friendItem.username}`}>
            <div className={"divSizeing"}>
                <Avatar src={props.friendItem.profilePicture} alt="profile avatar" sx={{ width: 50, height: 50 }}/>
            </div>
            <div className={"divSizeing"}>
                {props.friendItem.username}
            </div>
        </NavLink>
    )






}
