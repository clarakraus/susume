import React, {useCallback, useEffect, useState} from "react";
import {Susume} from "../service/Model";
import SusumeComponent from "../components/SusumeComponent";
import {getSusumesForNewsFeed} from "../service/BlogService";

export default function NewsfeedPage(){

    const [susumeArray, setSusumeArray] = useState<Array<Susume>>([])

    const refreshSusumes = useCallback(() => {
        getSusumesForNewsFeed()
            .then(data => setSusumeArray(data))
    }, [])


    useEffect(() =>{
        refreshSusumes()
    }, [refreshSusumes])

    const susumeList = susumeArray.map(susume =><SusumeComponent key={susume.postId} addToSaveList={true} susume={susume} privateList={false}  hasDeleteButton={false} isOnOwnBlog={false} refreshSusumes={refreshSusumes}/>)


    return(
        <div>
            {susumeList}
        </div>
    )

}