import {getProfileDetails} from "../service/BlogService";
import React, {useEffect, useState} from "react";
import {Susume} from "../service/Model";
import SusumeComponent from "../components/SusumeComponent";


export default function WatchlistPage(){
    const [savedSusumeList, setSavedSusumeList] = useState<Array<Susume>>([])
    const susumeList = savedSusumeList.map(susume =><SusumeComponent addToSaveList={false} susume={susume} privateList={true} hasDeleteButton={true} isOnOwnBlolg={false}/>)

   useEffect(() =>{
       getProfileDetails()
           .then(data => setSavedSusumeList(data.savedSusumes))
   }, [])


    return(
        <div>
            {susumeList}
        </div>
    )
}