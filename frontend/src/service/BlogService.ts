import axios, {AxiosResponse} from "axios";
import {Blog} from "./Model";

export function postProfile(username: string, profileDescription: string, profilePicture: string){
    return axios.post("/blog", {username, profileDescription, profilePicture})
    }

export function getProfileDetails(username:string){
    return axios.get(`/blog/${username}`)
        .then((response:AxiosResponse<Blog>) => response.data)
}