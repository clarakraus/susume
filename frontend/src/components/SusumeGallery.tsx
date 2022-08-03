import React, {useEffect, useState} from "react";
import {getSusumes, getSusumesForFriendBlog} from "../service/BlogService";
import SusumeComponent from "./SusumeComponent";
import {Susume} from "../service/Model";
import "./SusumeGallery.css";

interface BlogProps{
    creatorName: string
    addToSaveList: boolean
    privateList: boolean
    hasDeleteButton: boolean
    shownOnOwnBlog: boolean
}


export default function SusumeGallery(props: BlogProps){

    const [error, setError] = useState("")
    const [susumeArray, setSusumeArray] = useState<Array<Susume>>([])
    const susumeList = susumeArray.map(susume =><SusumeComponent key={susume.postId} addToSaveList={props.addToSaveList} susume={susume} privateList={props.privateList}  hasDeleteButton={props.hasDeleteButton} isOnOwnBlolg={props.shownOnOwnBlog}/>)

    useEffect(() =>{
        if(!props.creatorName) {
            getSusumes()
                .then((data) => setSusumeArray(data))
                .catch(() => setError('susumes could no not be loaded'))
        } else {
            getSusumesForFriendBlog(props.creatorName)
                .then((data)=>setSusumeArray(data))
                .catch(() => setError('susumes could no not be loaded'))
        }
    }, [props.creatorName])

    return (
        <>
            {error && <div>{error}</div>}
            <div className={"susumeAlign"}>
                {susumeList}
            </div>
        </>

    )
}