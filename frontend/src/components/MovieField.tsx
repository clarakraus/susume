import {MoviePreview} from "../service/Model";
import "./MovieField.css"
import {useNavigate} from "react-router-dom";

interface MovieApiSearchProps{
    movie: MoviePreview

}
export default function MovieField(props: MovieApiSearchProps){

    const movieId = props.movie.id
    const nav = useNavigate()

    const goToSavePage = () =>{
        nav("/addnew/" + movieId)
    }

    return(
        <div>

            <div className={"singleMovie"}>
                <p> {props.movie.original_title} </p>
                <p className="scroller"> {props.movie.overview} </p>
                <img src = {`https://image.tmdb.org/t/p/original/${props.movie.poster_path}`} width={120} alt="movie poster"/>`
                <p> {props.movie.release_date} </p>
            </div>
            <button onClick={goToSavePage}>
                add as susume
            </button>
        </div>
    )
}