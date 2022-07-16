import {Susume} from "../service/Model";

interface SusumeComponentProps{
    susume: Susume
}

export default function SusumeComponent(props: SusumeComponentProps){
    const category = props.susume.category
    const title = props.susume.title
    const picture= props.susume.poster_path
    const overview =props.susume.overview
    const homage= props.susume.homage
    const genre= props.susume.genre
    return(
        <>
            <div>
                {category}
            </div>
            <div>
                {title}
            </div>
            <div>
                {overview}
            </div>
            <div>
                {picture}
            </div>
            <div>
                {category}
            </div>
            <div>
                {homage}
            </div>
            <div>
                {genre}
            </div>

        </>
    )
}