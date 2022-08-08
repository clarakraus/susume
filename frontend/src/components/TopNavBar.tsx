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
                    <Avatar src={props.profilePicture} alt="profile avatar" sx={{ width: 120, height: 120 }}/>
                    <div className={"detailsDiv"}>
                        <p>{props.blogName}</p>
                        {props.profileDescription}
                    </div>
                </div>
                <div className={"navbarButton"}>
                    <Stack direction="row" spacing={2} >
                        <Button onClick={() =>nav("/newsfeed")} color={"inherit"}>news</Button>
                        <Button onClick={() =>nav("/profile/edit/blog")} color={"inherit"}>Edit Profile</Button>
                        <Button onClick={logOut} color={"inherit"}>Log out</Button>
                    </Stack>
                </div>
            </Toolbar>
        </AppBar>
    )
}