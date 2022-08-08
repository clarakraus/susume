import {AppBar, Avatar, Button, Stack, Toolbar} from "@mui/material";
import {useNavigate} from "react-router-dom";
import "./TopNavBar.css";

interface BlogComponentProps{
    blogName: string
    profilePicture: string
    profileDescription: string
}

export function TopNavBar(props: BlogComponentProps){
    const nav = useNavigate()

    const logOut = () => {
        localStorage.removeItem("jwt")
        nav("/")
    }
    return(
        <AppBar position={"static"} color="transparent" sx={{height: 160}}>
            <Toolbar>
                <div className={"barDetails"}>
                    <img src={process.env.PUBLIC_URL + '/logo.png'} width={"70px"} />
                </div>
                <div className={"navbarButton"}>
                    <Stack direction="row" spacing={2} >
                        <Button onClick={() =>nav("/newsfeed")} color={"inherit"}>News</Button>
                        <Button onClick={() =>nav("/profile/watchlist")} color={"inherit"}>Watchlist</Button>
                        <Button onClick={() =>nav("/profile/edit/blog")} color={"inherit"}>Edit Profile</Button>
                        <Button onClick={logOut} color={"inherit"}>Log out</Button>
                    </Stack>
                </div>
            </Toolbar>
        </AppBar>
    )
}