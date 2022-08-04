import {UserComment} from "../service/Model";
import React, {useEffect, useState} from "react";
import {getFriendBlogDetails} from "../service/BlogService";
import "./Commentcomponent.css"

interface SusumeComponentProps{
    userComment: UserComment
}

export default function CommentComponent(props: SusumeComponentProps){

    const username = props.userComment.username
    const content = props.userComment.commentContent
    const commentDate= props.userComment.createdAt
    const postId= props.userComment.postId
    const [profilePicture, setProfilepicture] = useState("")

    const date = new Date(commentDate)

    useEffect(() =>{
        getFriendBlogDetails(username)
            .then(data => setProfilepicture(data.profilePicture))

    }, [])


    return(
        <div>
            <div className="user">
                <img
                    src={profilePicture}
                    alt="user avatar"/>
                <div className="user-info">
                    <h5>{username}</h5>
                </div>
                <div className="dateInfo">
                    <small> {date.toLocaleDateString()}</small>
                </div>

            </div>
            <div className={"commentContent"}>
                <p>
                    {content}
                </p>
            </div>

        </div>
    )

}