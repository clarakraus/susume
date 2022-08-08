import React, {useCallback, useEffect, useState} from "react";
import {Susume} from "../service/Model";
import {getSusumesForNewsFeed} from "../service/BlogService";
import {useNavigate} from "react-router-dom";
import "../components/NewsfeedSusumeComponent.css"
import NewsfeedSusumeComponent from "../components/NewsfeedSusumeComponent";
import "./NewsfeedPage.css"
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";

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

    const logOut = () => {
        localStorage.removeItem("jwt")
        nav("/")}

        useEffect(() => {
            refreshSusumes()
        }, [refreshSusumes])

        const susumelist2 = susumeArray.map(susume => <NewsfeedSusumeComponent key={susume.postId} susume={susume}
                                                                               refreshSusume={refreshSusumes}/>)

        return (
            <>
                <div className={"newsfeedDiv"}>
                    {susumelist2}
                </div>
                <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
                    <BottomNavigation
                        showLabels
                    >
                        <BottomNavigationAction label="Blog" onClick={() => nav("/profile")}/>
                        <BottomNavigationAction label="Watchlist" onClick={() => nav("/profile/watchlist")}/>
                        <BottomNavigationAction label="Log out" onClick={logOut}/>


                    </BottomNavigation>
                </Paper>
            </>
        )

}