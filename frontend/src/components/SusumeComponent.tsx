import {Susume} from "../service/Model";
import "./SusumeComponent.css"
import {addToSaveList} from "../service/BlogService";

interface SusumeGalleryProps{
    susume: Susume
    addToSaveList: boolean

}

export default function SusumeComponent(props: SusumeGalleryProps){
    const category = props.susume.category
    const title = props.susume.content.title
    const picture= props.susume.content.poster_path
    const overview =props.susume.content.overview
    const homage= props.susume.homage
    const genre= props.susume.genre
    const susumeId = props.susume.postId

    const saveSusume = () => {
      addToSaveList(susumeId)
    }
    return(
        <>
           <div className={"singleSusume"}>
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
                    <button onClick={saveSusume}>add to favorites</button>
                </div>}

           </div>

        </>
    )
}