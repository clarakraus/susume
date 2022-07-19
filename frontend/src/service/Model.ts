
export interface Blog{
    blogId: string
    username:string
    profileDescription: string
    profilePicture: string
    friendsList: string[]
}

export interface MoviePreview{
    original_title:string
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
    id: string
    poster_path: string
    homage: string
    genre: string

}
export interface Content {
    title: string
    overview: string
    poster_path: string
}