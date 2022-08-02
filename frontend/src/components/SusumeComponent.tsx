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
    /*
     <Card sx={{maxWidth: 250, maxHeight: 450, margin: 3}}>
            <CardHeader
                title={genre}>
            </CardHeader>
            <CardMedia
                component="img"
                height="100"
                image={`https://image.tmdb.org/t/p/original/${picture}`}
                alt="movie poster"/>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.susume.content.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" overflow={"auto"} maxHeight={100}>
                    {overview}
                </Typography>
                <br/>
                {{homage} && <Typography variant="inherit" color="text.primary" overflow={"auto"} maxHeight={100}>
                    {`${creator}: "${homage}"`}
                </Typography>}
            </CardContent>
            {props.addToSaveList && <CardActions>
                <Button onClick={saveSusume} size="small">Add to watchlist</Button>
            </CardActions>}
            {props.hasDeleteButton && <CardActions>
                <Button onClick={deleteSusume} size="small">Delete</Button>
            </CardActions>}
            {props.isOnOwnBlolg && <CardActions>
                <Button onClick={deleteSusumeOnProfile} size="small">Delete</Button>
                <Button onClick={editSusume} size="small">Edit</Button>
            </CardActions>}
        </Card>
     */
    /*
    <div className={"singleSusume"}>
                {props.privateList && <div>
                    From: {creator}
                </div>}
                <div>
                    {category}
                </div>
                <div>
                    {title}
                </div>
                <div className="scroller">
                    {overview}
                </div>
                <div>
                    <img src={`https://image.tmdb.org/t/p/original/${picture}`} width={80} alt="movie poster"/>
                </div>
                <div>
                    {category}
                </div>

                <div className="scroller">
                    {homage}
                </div>
                <div>
                    {genre}
                </div>
                {props.addToSaveList && <div>
                    <button onClick={saveSusume}>add to watchlist</button>
                </div>}
                {props.hasDeleteButton && <div>
                    <button onClick={deleteSusume}>delete</button>
                </div>}
                {props.isOnOwnBlolg && <div>
                    <button onClick={deleteSusumeOnProfile}>delete</button>
                    <button onClick={editSusume}>edit</button>

                </div>}
            </div>
     */

    /*
    <div>
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <CardMedia
                                component="img"
                                height="100"
                                image={`https://image.tmdb.org/t/p/original/${picture}`}
                                alt="movie poster"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" >
                                    {props.susume.content.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" overflow={"auto"} maxHeight={100}>
                                    {overview}
                                </Typography>
                            </CardContent>
                        </div>
                        <div className="flip-card-back">
                            <h1>John Doe</h1>
                            <p>Architect & Engineer</p>
                            <p>We love that guy</p>
                        </div>
                    </div>
                </div>
            </div>
     */

    /*
     <div className="container">
                <div className="card">
                    <div className="card-header">
                        <img src={`https://image.tmdb.org/t/p/original/${picture}`} alt="movie poster" />
                    </div>
                    <div className="card-body">
                        <span className="tag tag-teal">{genre}</span>
                        <h3>
                            {title}
                        </h3>
                        <p >
                            {overview}
                        </p>
                        <div className="user">
                            <img src="https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo" alt="user" />
                            <div className="user-info">
                                <h5>July Dec</h5>
                                <small>2h ago</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="card">
                    <div className="card-header">

                    </div>

                    <div onClick={flipCard} className="card-body">
                        <h3>
                            {title}
                        </h3>
                        <div className="user">
                            <img src="https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo" alt="user" />
                            <div className="user-info">
                                <h5>{creator}</h5>
                                <small>2h ago</small>
                            </div>
                        </div>
                        <p>
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
                            <Button onClick={editSusume} size="small">Edit</Button>
                        </CardActions>}
                        <CardActions>
                            <Button size="small">comments</Button>
                        </CardActions>

                    </div>
                </div>
            </div>
     */
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