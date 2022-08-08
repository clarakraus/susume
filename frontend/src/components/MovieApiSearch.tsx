import {FormEvent, useState} from "react";
import {searchTMDB} from "../service/BlogService";
import {MoviePreview} from "../service/Model";
import MovieField from "./MovieField";
import "./MovieApiSearch.css";
import {Button, TextField} from "@mui/material";


export default function MovieApiSearch(){
    const [movieTitle, setMovieTitle]= useState("")
    const [movieArray, setMovieArray] = useState<Array<MoviePreview>>([])
    const movieList = movieArray.map(movie => <MovieField movie={movie}/>)


    const searchMovieApi = (ev: FormEvent) => {
        ev.preventDefault()
        searchTMDB(movieTitle)
            .then((data) => setMovieArray(data))
    }

    return(
        <div>
            <form onSubmit={event => searchMovieApi(event)}>
                <TextField size="small" type="text" placeholder="Movie-Title" value={movieTitle} onChange={ev => setMovieTitle(ev.target.value)}/>
                <Button color={"inherit"} type="submit">search</Button>
            </form>
            <div className="movie-list">
                {movieList}
            </div>
        </div>

    )
}