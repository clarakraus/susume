import axios, {AxiosResponse} from "axios";
import {Blog, FriendItem, LoginData, LoginResponse, MoviePost, MoviePreview, RegisterDetails, Susume} from "./Model";

export function postProfile(registerDetails: RegisterDetails){
    return axios.post("/user/register", registerDetails)
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
    return axios.post("/postings/movie/new/{username}", movie)
}
export function getSusumes(){
    return axios.get("/postings")
        .then((response:AxiosResponse<Susume[]>)=> response.data)
}
export function searchFriend(friend: string){
    return axios.get(`/blog/lookfor/${friend}`)
        .then((response:AxiosResponse<Blog[]>)=> response.data)
}

export function addFriend(friendId: string,username: string){
    axios.put(`/blog/${username}/addfriend/${friendId}`)
}

export function sendFriendsList(friendsList: Array<string>){
    return axios.post(`/blog/friendlist`, friendsList )
        .then((response: AxiosResponse<FriendItem[]>)=> response.data)
}
export const loginUser = (loginData: LoginData) => {
    return axios.post('/api/auth/login', loginData)
        .then((response: AxiosResponse<LoginResponse>) => response.data)
}
