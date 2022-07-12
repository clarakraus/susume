import axios, {AxiosResponse} from "axios";
import {Blog, MoviePreview} from "./Model";

export function postProfile(username: string, profileDescription: string, profilePicture: string){
    return axios.post("/blog", {username, profileDescription, profilePicture})
    }

export function getProfileDetails(username:string){
    return axios.get(`/blog/${username}`)
        .then((response:AxiosResponse<Blog>) => response.data)
}
export function searchTMDB(movieTitle: string){
    return axios.get(`/movie/search/${movieTitle}`)
        .then((response:AxiosResponse<MoviePreview[]>) => response.data)
}