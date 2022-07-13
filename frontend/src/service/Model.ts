
export interface Blog{
    profileName:string
    profileDescription: string
    profilePicture: string
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