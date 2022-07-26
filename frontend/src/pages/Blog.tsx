
import BlogComponent from "../components/BlogComponent";
import MovieApiSearch from "../components/MovieApiSearch";
import SusumeGallery from "../components/SusumeGallery";
import {useParams} from "react-router-dom";
import WatchlistPage from "./WatchlistPage";


export default function Blog(){
    const {username} = useParams()


    return(
        <>
            <div>
                <header/>
            </div>
            <div>
                <BlogComponent/>
            </div>
            <div>
                <MovieApiSearch/>
            </div>
            <div>
                <SusumeGallery creatorName={username!}/>
            </div>
            <div>
                <WatchlistPage/>
            </div>

        </>
    )

}