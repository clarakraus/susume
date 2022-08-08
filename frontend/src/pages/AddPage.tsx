import {useNavigate, useParams} from "react-router-dom";
import {postMovieToDB, searchTMDBForID} from "../service/BlogService";
import React, {useEffect, useState} from "react";
import {MoviePreview} from "../service/Model";
import "./AddPage.css"
import {Button, TextField} from "@mui/material";

export default function AddPage(){
    const {movieId} = useParams()
    const nav = useNavigate()

    const [movieToAdd, setMovieToAdd] = useState({} as MoviePreview)
    const [id, setId] = useState("")
    const [homage, setHomage] = useState("")
    const [genre, setGenre] = useState("NO_GENRE")
    const [errorMessage, setErrorMessage] = useState("")





   useEffect( () => {
       if(movieId){
           searchTMDBForID(movieId)
               .then(data => setMovieToAdd(data))
               .then(() => setId(movieId))
               .catch(() => setErrorMessage("We couldn't load your movie, oopsies!",
                   ))
       }

   }, [movieId])

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setGenre(event.target.value);
    };


    const postMovie = () =>{

        postMovieToDB({id, homage, genre})
            .then(() => nav(`/profile`))
    }


    return(
        <>
            <div className={"addContainer"}>
                {errorMessage && <div>{errorMessage}</div>}
                <div className={"movieInfoAddPage"}>
                    <div className={"poster"}>
                        <img src={`https://image.tmdb.org/t/p/original/${movieToAdd.poster_path}`} width={200}
                             alt="movie poster"/>
                    </div>
                    <div className={"desc"}>
                        <h2> {movieToAdd.original_title} </h2>
                        <p> {movieToAdd.overview} </p>
                        <p> {movieToAdd.release_date} </p>
                    </div>
                </div>
                <TextField  multiline rows={6}  sx={{width: 350}} placeholder={"tell your friends why you love this movie"} onChange={event => setHomage( event.target.value)}/>

                <div className={"dropdown"}>
                    <label>You decide the genre</label>
                    <select value={genre} onChange={handleChange}>
                        <option value="NO_GENRE">can't fit this one in a box</option>
                        <option value="HORROR">horror</option>
                        <option value="THRILLER">thriller</option>
                        <option value="COMEDY">comedy</option>
                        <option value="DRAMA">drama</option>
                        <option value="ACTION">action</option>
                        <option value="SUPERHERO">superhero</option>
                        <option value="HISTORICAL">historical</option>
                        <option value="SCIENCE_FICTION">science fiction</option>
                        <option value="WESTERN">western</option>
                        <option value="MUSICAL">musical</option>
                        <option value="FANTASY">fantasy</option>
                        <option value="DOCUMENTARY">documentary</option>
                        <option value="KIDS">kids</option>
                        <option value="CULT">cult</option>
                        <option value="ROMANTIC">romantic</option>
                    </select>
                </div>
                <div>
                    <Button onClick= {postMovie}> save to recommendations</Button>
                </div>
            </div>
        </>
    )
}