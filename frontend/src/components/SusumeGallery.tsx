import React, {useEffect, useState} from "react";
import {getSusumes, getSusumesForFriendBlog} from "../service/BlogService";
import SusumeComponent from "./SusumeComponent";
import {Susume} from "../service/Model";

interface SusumeCreatorProps{
    creatorName: string
}


export default function SusumeGallery(props: SusumeCreatorProps){

    const [error, setError] = useState("")
    const [susumeArray, setSusumeArray] = useState<Array<Susume>>([])
    const susumeList = susumeArray.map(susume =><SusumeComponent susume={susume} />)

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
    }, [])

    return (
        <>
            {error && <div>{error}</div>}
            <div>
                {susumeList}
            </div>
        </>

    )
}