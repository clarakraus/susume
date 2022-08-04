import {AppBar, Button, Stack, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";



export const TopNavBar = () => {
    const nav = useNavigate()

    const logOut = () => {
        localStorage.removeItem("jwt")
        nav("/")
    }
    return(
        <AppBar position={"static"} color="transparent">
            <Toolbar>
                susume
                <Typography variant={"h6"} component={"div"} sx={{flexGrow: 1}} >
                </Typography>
                <Stack direction="row" spacing={2} >
                    <Button onClick={() =>nav("/newsfeed")} color={"inherit"}>news</Button>
                    <Button color={"inherit"}>notifications</Button>
                    <Button color={"inherit"}>settings</Button>
                    <Button onClick={logOut} color={"inherit"}>Log out</Button>
                </Stack>

            </Toolbar>
        </AppBar>
    )
}