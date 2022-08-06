import React, {useCallback, useEffect, useState} from "react";
import {Susume} from "../service/Model";
import {getSusumesForNewsFeed} from "../service/BlogService";
import {useNavigate} from "react-router-dom";
import "../components/NewsfeedSusumeComponent.css"
import NewsfeedSusumeComponent from "../components/NewsfeedSusumeComponent";
import "./NewsfeedPage.css"

export default function NewsfeedPage(){
    const nav = useNavigate()
    const [susumeArray, setSusumeArray] = useState<Array<Susume>>([])

    const refreshSusumes = useCallback(() => {
        getSusumesForNewsFeed()
            .then(data => setSusumeArray(data))
            .catch((e) => {
                if(e.response.status === 403){
                    nav("/")
                }
            })
    }, [nav])


    useEffect(() =>{
        refreshSusumes()
    }, [refreshSusumes])

    const susumelist2= susumeArray.map(susume =><NewsfeedSusumeComponent key={susume.postId} susume={susume} refreshSusume={refreshSusumes}/>)

    return(
        <>
            <div className={"newsfeedDiv"}>
                {susumelist2}
            </div>
        </>
    )

}