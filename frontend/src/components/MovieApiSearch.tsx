import {FormEvent, useState} from "react";
import {searchTMDB} from "../service/BlogService";
import {MoviePreview} from "../service/Model";

export default function MovieApiSearch(){
    const [movieTitle, setMovieTitle]= useState("")
    const [title, setTitle] = useState("")
    const [overview, setOverview] =useState("")
    const [poster, setPoster] = useState("")
    const [movieArray, setMovieArray] = useState<Array<MoviePreview>>([])
    const [date, setDate] = useState("")
    const movieList = movieArray.map(movie => { return( <div> <p> {movie.original_title} </p> <p> {movie.release_date} </p> </div>)})

    const searchMovieApi = (ev: FormEvent) => {
        ev.preventDefault()
        searchTMDB(movieTitle)
            .then((data) => setMovieArray(data))

            }


    return(
        <div>
            <form onSubmit={event => searchMovieApi(event)}>
                <input type="text" placeholder="Movie-Title" value={movieTitle} onChange={ev => setMovieTitle(ev.target.value)}/>
                <button type="submit">search</button>
            </form>
            {movieList}
        </div>
    )
}