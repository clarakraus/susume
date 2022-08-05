
export interface Blog{
    blogId: string
    username:string
    profileDescription: string
    profilePicture: string
    friendsList: Array<string>
    savedSusumes:Array<Susume>
}

export interface MoviePreview{
    original_title?:string
    id: number
    overview:string
    poster_path:string
    release_date:string
}

export interface MoviePost{
    id: string
    homage:string
    genre: string
}

export interface Susume{
    category: string
    content: Content
    postId: string
    poster_path: string
    homage: string
    genre: string
    creater: string
    comments: Array<UserComment>
}

export interface Content {
    title: string
    originalTitle: string
    overview: string
    poster_path: string
}
export interface FriendItem{
    username: string
    profilePicture: string
    blogId: string
}
export interface RegisterDetails {
    username: string
    password: string
    passwordRepeat: string
    profileDescription: string
    profilePicture: string
}
export interface LoginData {
    username: string
    password: string
}
export interface LoginResponse {
    jwt: string
}
export interface EditBlogData {
    profilePicture: string
    profileDescription: string
}
export interface EditPostData{
    homage: string
    genre: String
}
export interface UserComment{
    commentContent: string
    username: string
    postId: string
    createdAt: number
}