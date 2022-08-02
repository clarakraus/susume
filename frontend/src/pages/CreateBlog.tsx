import React, {useState} from "react";
import {postProfile} from "../service/BlogService";
import {useNavigate} from "react-router-dom";
import {Button, createTheme, TextField, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        secondary: {
            main: '#FEFBE7',
        },
    },
});

export default function CreateBlog(){

    const[username, setUsername] = useState("");
    const[profileDescription, setProfileDescription] = useState("");
    const[profilePicture, setProfilePicture] = useState("https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg");
    const [password, setPassword]= useState("")
    const [passwordRepeat, setPasswordRepeat]= useState("")
    const nav = useNavigate();
    const[message, setMessage] = useState("")



    const createProfile = () => {
        if(username) {
            postProfile({username, password, passwordRepeat, profileDescription, profilePicture})
                .then(() => nav("/"))
        } else {
            setMessage("please enter a username")
        }
    }

    return(
        <>
            <div className={"formwrapper"}>
                {message && <div>{message}</div>}
                <h2>Create your account</h2>
                <div className={"divSpacer"}>
                    <TextField variant={"filled"} size={"small"} type="text" placeholder="choose a username"
                           onChange={event => setUsername(event.target.value)}/>
                </div>
                <div className={"divSpacer"}>
                <TextField variant={"filled"} multiline rows={4} size={"small"} placeholder="tell us something about yourself"
                           onChange={event => setProfileDescription(event.target.value)}/>
                </div>

                <div className={"divSpacer"}>
                    <TextField variant={"filled"} size={"small"} placeholder="profile picture URL" onChange={event => setProfilePicture(event.target.value)}/>
                </div>
                <div className={"divSpacer"}>
                    <TextField variant={"filled"} size={"small"} type="password" placeholder={"password"} onChange={event => setPassword(event.target.value)} value={password}/>
                </div>
                <div className={"divSpacer"}>
                    <TextField variant={"filled"} size={"small"} type="password" placeholder={"repeat password"} onChange={event => setPasswordRepeat(event.target.value)} value={passwordRepeat}/>
                </div>
                <ThemeProvider theme={theme}>
                    <Button color={"secondary"} size={"small"} variant={"contained"} onClick={createProfile} >register</Button>
                </ThemeProvider>
            </div>

        </>
    )
}