import SusumeGallery from "../components/SusumeGallery";
import React, {useEffect, useState} from "react";
import {Susume} from "../service/Model";
import SusumeComponent from "../components/SusumeComponent";
import {getSusumesForNewsFeed} from "../service/BlogService";

export default function NewsfeedPage(){

    const [susumeArray, setSusumeArray] = useState<Array<Susume>>([])
    const susumeList = susumeArray.map(susume =><SusumeComponent key={susume.postId} addToSaveList={true} susume={susume} privateList={false}  hasDeleteButton={false} isOnOwnBlog={false}/>)

    useEffect(() =>{
        getSusumesForNewsFeed()
            .then(data => setSusumeArray(data))

    }, [])


    return(
        <div>
            {susumeList}
        </div>
    )

}