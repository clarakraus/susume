
import BlogComponent from "../components/BlogComponent";
import MovieApiSearch from "../components/MovieApiSearch";
import SusumeGallery from "../components/SusumeGallery";
import {useParams} from "react-router-dom";


export default function Blog(){
    const {username} = useParams()


    return(
        <>
            <div>
                <header/>
            </div>
            <div>
                <BlogComponent blogName={username!}/>
            </div>
            <div>
                <MovieApiSearch/>
            </div>
            <div>
                <SusumeGallery creatorName={username!}/>
            </div>

        </>
    )

}