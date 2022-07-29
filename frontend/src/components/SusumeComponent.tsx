import {Susume} from "../service/Model";
import "./SusumeComponent.css"
import {addToSaveList, deletePosting, editBlog, editPostings, removeFromSaveList} from "../service/BlogService";
import {useNavigate} from "react-router-dom";

interface SusumeGalleryProps{
    susume: Susume
    addToSaveList: boolean
    privateList: boolean
    hasDeleteButton: boolean
    isOnOwnBlolg: boolean
}

export default function SusumeComponent(props: SusumeGalleryProps){
    const category = props.susume.category
    const title = props.susume.content.title
    const picture= props.susume.content.poster_path
    const overview =props.susume.content.overview
    const homage= props.susume.homage
    const genre= props.susume.genre
    const susumeId = props.susume.postId
    const creator = props.susume.creater

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
        editPostings(susumeId)
            .then(() => nav(`/profile/edit/${susumeId}`))

    }

    return(
        <>
           <div className={"singleSusume"}>
               {props.privateList&& <div>
                   From: {creator}
               </div>}
               <div>
                    {category}
                </div>
                <div>
                    {title}
                </div>
                <div className={"scroller"}>
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

        </>
    )
}