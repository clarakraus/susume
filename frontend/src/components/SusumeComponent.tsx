import {Susume, UserComment} from "../service/Model";
import "./SusumeComponent.css"
import {
    addToSaveList,
    deletePosting,
    getFriendBlogDetails, getSingleSusume,
    postComment,
    removeFromSaveList
} from "../service/BlogService";
import {useNavigate} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import React, {useCallback, useEffect, useRef, useState} from "react";
import CommentComponent from "./CommentComponent";

interface SusumeGalleryProps {
    susume: Susume
    addToSaveList: boolean
    refreshSusumes: () => void
    privateList: boolean
    hasDeleteButton: boolean
    isOnOwnBlog: boolean
}

export default function SusumeComponent(props: SusumeGalleryProps) {
  //  const category = props.susume.category
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

    const [cardElement, setCardElement] = useState({} as HTMLDivElement)

    const ref = useRef({} as HTMLDivElement);

    const nav = useNavigate()


    useEffect(() =>{
        getFriendBlogDetails(creator)
            .then(data => setProfilepicture(data.profilePicture))
            .then(() => setCommentArray(props.susume.comments))

    }, [creator, susumeId])

    const refreshComments = useCallback(() => {
        getSingleSusume(susumeId)
            .then(susume =>setCommentArray(susume.comments))
    }, [props.susume.comments])

    const commentItems = commentArray.map(comment =><CommentComponent key={comment.createdAt} userComment={comment} refreshComments={refreshComments} />)

    const saveSusume = () => {
        addToSaveList(susumeId)
            .then(() => nav("/profile/watchlist"))
    }
    const deleteSusume = () => {
        removeFromSaveList(susumeId)
            .then(props.refreshSusumes)


    }
    const deleteSusumeOnProfile = () => {
        deletePosting(susumeId)
            .then(props.refreshSusumes)

    }
    const editSusume = () => {
        nav(`/profile/edit/${susumeId}`)

    }

    function flipCard() {
        cardElement.classList.toggle("is-flipped")
    }

    useEffect(() => {
        setCardElement(ref.current)
    }, [])

    function createComment(){
        postComment(commentContent, susumeId)
            .then(() => {
                refreshComments()
                setCommentContent("")
            })
    }

    return (

        <>
            <div className={"movie-card divBody"}>
                <div ref={ref} className={"card-inner"}>
                    <div className={"card-face card-front"}>
                        <div className="card">
                            <div className="card-header">
                                <img src={`https://image.tmdb.org/t/p/original/${picture}`} alt="movie poster"/>
                            </div>
                            <div className="card-body">
                                <span className="tag tag-teal">{genre}</span>
                                <h3>
                                    {title}
                                </h3>
                                <p>
                                    {overview}
                                </p>
                                <div className="user">
                                    <img
                                        src={profilePicture}
                                        alt="user"/>
                                    <div className="user-info">
                                        <h5>July Dec</h5>
                                        <small>2h ago</small>
                                    </div>
                                    <div>
                                        <Button className={"flipButton"} onClick={flipCard} size="small">flip</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-face card-back">

                        <div className={"card"}>
                                <div className={"card-body"}>
                                    <h3>
                                        {title}
                                    </h3>
                                    <div className="user">
                                        <img
                                            src={profilePicture}
                                            alt="user"/>
                                        {creator}
                                    </div>
                                    <p className={"descriptionParagraph"}>
                                        {homage}
                                    </p>
                                    <div className={"commentField"}>
                                        <Button onClick={createComment}>post</Button>
                                        <TextField variant={"filled"} multiline rows={1} size={"small"} placeholder="comment"
                                                   onChange={event => setCommentContent(event.target.value)} value={commentContent}/>
                                    </div>
                                    <div className={"alignComments"}>
                                        {commentItems}
                                    </div>

                                </div>
                                <div className={"backButtons"}>
                                    {props.hasDeleteButton && <div>
                                        <Button onClick={deleteSusume} size="small">Delete</Button>
                                    </div>}
                                    {props.addToSaveList && <div>
                                        <Button onClick={saveSusume} size="small">Add to watchlist</Button>
                                    </div>}
                                    {props.isOnOwnBlog && <div>
                                        <Button onClick={deleteSusumeOnProfile} size="small">Delete</Button>
                                    </div>}
                                    {props.isOnOwnBlog && <div>
                                        <Button  onClick={editSusume} size="small">Edit</Button>
                                    </div>}
                                    <Button onClick={flipCard} size="small">Flip</Button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}