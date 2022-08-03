import {Susume} from "../service/Model";
import "./SusumeComponent.css"
import {addToSaveList, deletePosting, removeFromSaveList} from "../service/BlogService";
import {useNavigate} from "react-router-dom";
import {Button,CardActions} from "@mui/material";
import {useEffect, useRef, useState} from "react";

interface SusumeGalleryProps {
    susume: Susume
    addToSaveList: boolean
    privateList: boolean
    hasDeleteButton: boolean
    isOnOwnBlolg: boolean
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

    const [cardElement, setCardElement] = useState({} as HTMLDivElement)
    const ref = useRef({} as HTMLDivElement);

    const nav = useNavigate()

    const saveSusume = () => {
        addToSaveList(susumeId)
            .then(() => nav("/profile/watchlist"))
    }
    const deleteSusume = () => {
        removeFromSaveList(susumeId)

    }
    const deleteSusumeOnProfile = () => {
        deletePosting(susumeId)

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


    return (

        <>

            <div className={"movie-card divBody"}>
                <div ref={ref} className={"card-inner"}>
                    <div onClick={flipCard} className={"card-face card-front"}>
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
                                        src="https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo"
                                        alt="user"/>
                                    <div className="user-info">
                                        <h5>July Dec</h5>
                                        <small>2h ago</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div onClick={flipCard} className="card-face card-back">

                        <div className={"card"}>
                            <div className={"card-body"}>
                                <h3>
                                    {title}
                                </h3>
                                <div className="user">
                                    <img
                                        src="https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo"
                                        alt="user"/>
                                    {creator}
                                </div>
                                <p className={"descriptionParagraph"}>
                                    {homage}
                                </p>
                                {props.addToSaveList && <CardActions>
                                    <Button onClick={saveSusume} size="small">Add to watchlist</Button>
                                </CardActions>}
                                {props.hasDeleteButton && <CardActions>
                                    <Button onClick={deleteSusume} size="small">Delete</Button>
                                </CardActions>}
                                {props.isOnOwnBlolg && <CardActions>
                                    <Button onClick={deleteSusumeOnProfile} size="small">Delete</Button>
                                    <Button  onClick={editSusume} size="small">Edit</Button>
                                </CardActions>}
                                <CardActions>
                                    <Button className={"inhibitFlip"} size="small">comments</Button>
                                </CardActions>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}