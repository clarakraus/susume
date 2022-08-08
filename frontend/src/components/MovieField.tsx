import {MoviePreview} from "../service/Model";
import "./MovieField.css"
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

interface MovieApiSearchProps{
    movie: MoviePreview

}
export default function MovieField(props: MovieApiSearchProps){

    const movieId = props.movie.id
    const nav = useNavigate()
 //   const {username} = useParams()

    const goToSavePage = () =>{
        nav(`/profile/addnew/${movieId}`)
    }

    return(
        <>
            <div className="movieContainer">
                <div className="movieCard">
                    <div className="movieCard-header">
                        <img src={`https://image.tmdb.org/t/p/original/${props.movie.poster_path}`} width={120}
                             alt="movie poster"/>`
                    </div>
                    <div className="movieCard-body">
                        <h2>
                            {props.movie.original_title}
                        </h2>
                        <div className={"movieOverview"}>
                                {props.movie.overview}
                        </div>
                        {props.movie.release_date}

                        <Button onClick={goToSavePage}>
                            add as susume
                        </Button>
                    </div>
                </div>
            </div>
            </>

                )
                }
