import axios, {AxiosResponse} from "axios";
import {Blog, MoviePost, MoviePreview, Susume} from "./Model";

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
export function searchTMDBForID(movieId: string){
    return axios.get(`/postings/movie/id/${movieId}`)
        .then((response:AxiosResponse<MoviePreview>) => response.data)
}
export function postMovieToDB(movie: MoviePost){
    return axios.post("/postings/movie/new", movie)
}
export function getSusumes(){
    return axios.get("/postings")
        .then((response:AxiosResponse<Susume[]>)=> response.data)
}
export function searchFriend(friend: string){
    return axios.get(`/blog/lookfor/${friend}`)
        .then((response:AxiosResponse<Blog[]>)=> response.data)
}
