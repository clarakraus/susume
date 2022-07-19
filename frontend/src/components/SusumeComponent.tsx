import {Content, Susume} from "../service/Model";
import "./SusumeComponent.css"

interface SusumeComponentProps{
    susume: Susume

}

export default function SusumeComponent(props: SusumeComponentProps){
    const category = props.susume.category
    const title = props.susume.content.title
    const picture= props.susume.content.poster_path
    const overview =props.susume.content.overview
    const homage= props.susume.homage
    const genre= props.susume.genre
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
           </div>

        </>
    )
}