import axios, {AxiosResponse} from "axios";
import {Blog, FriendItem, LoginData, LoginResponse, MoviePost, MoviePreview, RegisterDetails, Susume} from "./Model";

export function postProfile(registerDetails: RegisterDetails){
    return axios.post("/user/register", registerDetails)
    }

export function getProfileDetails(){
    return axios.get(`/blog/details`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then((response:AxiosResponse<Blog>) => response.data)
}
export function getFriendBlogDetails(username: string){
    return axios.get(`/blog/getfriendblog/${username}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then((response:AxiosResponse<Blog>) => response.data)
}
export function searchTMDB(movieTitle: string){
    return axios.get(`/movie/search/${movieTitle}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then((response:AxiosResponse<MoviePreview[]>) => response.data)
}
export function searchTMDBForID(movieId: string){
    return axios.get(`/postings/movie/id/${movieId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then((response:AxiosResponse<MoviePreview>) => response.data)
}
export function postMovieToDB(movie: MoviePost){
    return axios.post("/postings/movie/new", movie, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
}
export function getSusumes(){
    return axios.get("/postings", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
            })
        .then((response:AxiosResponse<Susume[]>)=> response.data)
}

export function getSusumesForFriendBlog(username:string){
    return axios.get(`/postings/friends/${username}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then((response:AxiosResponse<Susume[]>)=> response.data)
}
export function searchFriend(friend: string){
    return axios.get(`/blog/lookfor/${friend}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then((response:AxiosResponse<FriendItem[]>)=> response.data)
}

export function addFriend(friendId: string){
   return axios.put(`/blog/addfriend/${friendId}`, {}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
}

export function sendFriendsList(friendsList: Array<string>){
    return axios.post(`/blog/friendlist`, friendsList, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    } )
        .then((response: AxiosResponse<FriendItem[]>)=> response.data)
}
export const loginUser = (loginData: LoginData) => {
    return axios.post('/api/login', loginData)
        .then((response: AxiosResponse<LoginResponse>) => response.data)
}
