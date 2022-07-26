import BlogComponent from "../components/BlogComponent";
import {useParams} from "react-router-dom";
import SusumeGallery from "../components/SusumeGallery";

export default function FriendPage(){

    const {username} = useParams()

    return(
        <>
            <div>
                <BlogComponent blogName={username!}/>
            </div>
            <div>
                <SusumeGallery creatorName={username!}/>
            </div>
        </>
    )
}