import {useParams} from "react-router-dom";
import {postMovieToDB, searchTMDBForID} from "../service/BlogService";
import React, {useEffect, useState} from "react";
import {MoviePreview} from "../service/Model";

export default function AddPage(){
    const {movieId} = useParams()
    const {blogname} = useParams()
    const [movieToAdd, setMovieToAdd] = useState({} as MoviePreview)
    const [id, setId] = useState("")
    const [homage, setHomage] = useState("")
    const [genre, setGenre] = useState("")
    const creater = blogname
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
        if(creater){
        postMovieToDB({id, homage, genre, creater})}
    }


    return(
        <>
            {errorMessage && <div>{errorMessage}</div>}
            <div>
                <p> {movieToAdd.original_title} </p>
                <p> {movieToAdd.overview} </p>
                <img src={`https://image.tmdb.org/t/p/original/${movieToAdd.poster_path}`} width={120}
                     alt="movie poster"/>
                <p> {movieToAdd.release_date} </p>
            </div>
            <div>
                <input type="text" placeholder={"tell the your friends why you love this movie"} onChange={event => setHomage( event.target.value)}/>
            </div>
            <div>
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
                <button onClick= {postMovie}> save to recommendations</button>
            </div>
        </>
    )
}