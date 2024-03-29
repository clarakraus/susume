import axios, {AxiosResponse} from "axios";
import {
    Blog,
    EditBlogData, EditPostData,
    FriendItem,
    LoginData,
    LoginResponse,
    MoviePost,
    MoviePreview,
    RegisterDetails,
    Susume
} from "./Model";

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
    return axios.post("/blog/postings/movie/new", movie, {
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
export function loginUser(loginData: LoginData){
    return axios.post('/api/login', loginData)
        .then((response: AxiosResponse<LoginResponse>) => response.data)
}

export function addToSaveList(susumeId: string){
    return axios.put(`/blog/collection/save/${susumeId}`, {},{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
}
export function removeFromSaveList(susumeId: string){
    return axios.put(`/blog/collection/delete/${susumeId}`, {},{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
}
export function editBlog(editBlogData: EditBlogData, blogId: string){
    return axios.put(`/blog/edit/${blogId}`, editBlogData,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
}
export function deletePosting(postId: string){
    return axios.put(`/postings/delete/${postId}`, {},  {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
}
export function editPostings(postId: string, editPostData: EditPostData){
    return axios.put(`/postings/edit/${postId}`,editPostData ,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
}
export function getSingleSusume(susumePostId: string){
    return axios.get(`/postings/${susumePostId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then((response:AxiosResponse<Susume>)=> response.data)

}
export function getSusumesForNewsFeed(){
    return axios.get(`/blog/postings/newsfeed`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then((response:AxiosResponse<Susume[]>)=> response.data)
}

export function postComment(commentContent: string, postId: string){
    return axios.put(`/postings/comment`,{
            commentContent,
            postId
        } , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        })

}
