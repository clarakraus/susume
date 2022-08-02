import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";

import {editPostings, getSingleSusume} from "../service/BlogService";

export default function EditSusumePage(){

    const {susumeId} = useParams()
    const nav = useNavigate()

    const [homage, setHomage] = useState("")
    const [genre, setGenre] = useState("NO_GENRE")
    //const [errorMessage, setErrorMessage] = useState("")
    const [poster, setPoster] = useState("")
    const [title, setTitle] = useState("")
    const [overview, setOverview] = useState("")


    useEffect(() =>{
        if(susumeId){
            getSingleSusume(susumeId)
                .then(data => {
                    setGenre(data.genre)
                    setHomage(data.homage)
                    setPoster(data.content.poster_path)
                    setTitle(data.content.title)
                    setOverview(data.content.overview)
                })
        }

    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setGenre(event.target.value);
    };
    const editPost = () => {
        if(susumeId) {
            editPostings(susumeId, {homage, genre})
                .then(() => nav("/profile"))
        }

    }

    return(
        <div>
            <div>
                <p> {title} </p>
                <p> {overview} </p>
                <img src={`https://image.tmdb.org/t/p/original/${poster}`} width={120}
                     alt="movie poster"/>
            </div>
            <div>
                <textarea placeholder={homage} onChange={event => setHomage( event.target.value)}/>
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
                <button onClick= {editPost}>update</button>
            </div>
        </div>
    )
}