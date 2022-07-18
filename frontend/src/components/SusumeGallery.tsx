import React, {useEffect, useState} from "react";
import {getSusumes} from "../service/BlogService";
import SusumeComponent from "./SusumeComponent";
import {Susume} from "../service/Model";

export default function SusumeGallery(){

    const [error, setError] = useState("")
    const [susumeArray, setSusumeArray] = useState<Array<Susume>>([])
    const susumeList = susumeArray.map(susume =><SusumeComponent susume={susume}/>)
    useEffect(() =>{
        getSusumes()
            .then((data) => setSusumeArray(data))
            .catch(() => setError('susumes could no not be loaded'))
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