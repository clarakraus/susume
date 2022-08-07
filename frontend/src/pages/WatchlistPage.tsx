import {getProfileDetails} from "../service/BlogService";
import React, {useCallback, useEffect, useState} from "react";
import {Susume} from "../service/Model";
import SusumeComponent from "../components/SusumeComponent";
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import {useNavigate} from "react-router-dom";
import "./WatchlistPage.css"


export default function WatchlistPage(){
    const [savedSusumeList, setSavedSusumeList] = useState<Array<Susume>>([])
   const nav = useNavigate();


    const refreshSusumeWatchlist = useCallback(() => {
            getProfileDetails()
                .then(data => setSavedSusumeList(data.savedSusumes))
                .catch((e) => {
                    if(e.response.status === 403){
                        nav("/")
                    }
                })
    }, [])

   useEffect(() =>{
      refreshSusumeWatchlist()
   }, [refreshSusumeWatchlist])

    const susumeList = savedSusumeList.map(susume =><SusumeComponent addToSaveList={false} susume={susume} privateList={true} hasDeleteButton={true} isOnOwnBlog={false} refreshSusumes={refreshSusumeWatchlist}/>)

    return(
        <>
            <h2>Watchlist</h2>
            <div className={"watchlist"}>
                {susumeList}
            </div>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                >
                    <BottomNavigationAction label="blog" onClick={() => nav("/profile")}/>
                    <BottomNavigationAction label="Friends" />
                    <BottomNavigationAction label="News" onClick={() => nav("/newsfeed")}/>

                </BottomNavigation>
            </Paper>
        </>
    )
}