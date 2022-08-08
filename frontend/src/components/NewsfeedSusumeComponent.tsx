import React, {useCallback, useEffect, useState} from "react";
import {Susume, UserComment} from "../service/Model";
import {useNavigate} from "react-router-dom";
import {
    addToSaveList,
    getFriendBlogDetails,
    getSingleSusume, postComment,
} from "../service/BlogService";
import CommentComponent from "./CommentComponent";
import "./NewsfeedSusumeComponent.css";
import {Avatar, Button, TextField} from "@mui/material";


interface NewsfeedProps {
    susume: Susume
    refreshSusume: () => void
}


export default function NewsfeedSusumeComponent(props:NewsfeedProps){

        const title = props.susume.content.title
        const picture = props.susume.content.poster_path
        const overview = props.susume.content.overview
        const homage = props.susume.homage
        const genre = props.susume.genre
        const susumeId = props.susume.postId
        const creator = props.susume.creater
        const [commentArray, setCommentArray] = useState<Array<UserComment>>([])

        const [commentContent, setCommentContent] = useState("")

        const [profilePicture, setProfilepicture] = useState("")

        const nav = useNavigate()


        useEffect(() =>{
            getFriendBlogDetails(creator)
                .then(data => setProfilepicture(data.profilePicture))
                .then(() => setCommentArray(props.susume.comments))

        }, [creator, susumeId, props.susume.comments])

        const refreshComments = useCallback(() => {
            getSingleSusume(susumeId)
                .then(susume =>setCommentArray(susume.comments))
        }, [susumeId])

        const commentItems = commentArray.map(comment =><CommentComponent key={comment.createdAt} userComment={comment} refreshComments={refreshComments} />)

        const saveSusume = () => {
            addToSaveList(susumeId)
                .then(() => nav("/profile/watchlist"))
        }



        function createComment(){
            postComment(commentContent, susumeId)
                .then(() => {
                    refreshComments()
                    setCommentContent("")
                })
        }


        return(
        <div>
            <div>
                <div className="courses-container">
                    <div className="course">
                        <div className="course-preview" style={{backgroundImage: `url("https://image.tmdb.org/t/p/original/${picture}")`,
                            backgroundSize: "cover",
                        } }>
                        </div>
                        <div className="course-info">
                            <div className={"homageHeader"}>
                                <a href={`/profile/${creator}`}>
                                    <div>
                                        <Avatar src={profilePicture}/>
                                    </div></a>
                                {{homage} && <p>{creator}: "{homage}"</p>}
                            </div>

                            <div className={"movieInfo"}>
                                <h2>{title}</h2>
                                <span className="tag tag-teal">{genre}</span>
                                <h6>{overview}</h6>
                            </div>

                            <div className={"commentSection"}>
                                {commentItems}
                            </div>
                            <div className={"commentField"}>
                                <Button onClick={createComment}>post</Button>
                                <TextField variant={"filled"} multiline rows={1} size={"small"} placeholder="comment"
                                           onChange={event => setCommentContent(event.target.value)} value={commentContent}/>
                            </div>
                            <button className="btn" onClick={saveSusume}>Add to Watchlist</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}