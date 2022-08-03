import {getProfileDetails} from "../service/BlogService";
import React, {useEffect, useState} from "react";
import {Susume} from "../service/Model";
import SusumeComponent from "../components/SusumeComponent";
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import {useNavigate} from "react-router-dom";


export default function WatchlistPage(){
    const [savedSusumeList, setSavedSusumeList] = useState<Array<Susume>>([])
    const susumeList = savedSusumeList.map(susume =><SusumeComponent addToSaveList={false} susume={susume} privateList={true} hasDeleteButton={true} isOnOwnBlolg={false}/>)
    const nav = useNavigate();

   useEffect(() =>{
       getProfileDetails()
           .then(data => setSavedSusumeList(data.savedSusumes))
   }, [])


    return(
        <>
            <h2>Watchlist</h2>
            <div>
                {susumeList}
            </div>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                >
                    <BottomNavigationAction label="blog" onClick={() => nav("/profile")}/>
                    <BottomNavigationAction label="Friends" />
                    <BottomNavigationAction label="Edit profile" onClick={() => nav("/profile/edit/blog")}/>
                </BottomNavigation>
            </Paper>
        </>
    )
}