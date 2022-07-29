import React, {useState} from "react";
import {postProfile} from "../service/BlogService";
import {useNavigate} from "react-router-dom";

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
   //             .then(() => nav("/profile/" + username))
        } else {
            setMessage("please enter a username")
        }
    }

    return(
        <>
            {message && <div>{message}</div>}
            <div>
                <input type="text" placeholder="choose a username"
                       onChange={event => setUsername(event.target.value)}/>
            </div>
            <div>
                <textarea  placeholder="tell us something about yourself"
                       onChange={event => setProfileDescription(event.target.value)}/>
            </div>

            <div>
                <input type="picture" placeholder="upload your picture here" onChange={event => setProfilePicture(event.target.value)}/>
            </div>
            <div>
                <input type="password" placeholder={"password"} onChange={event => setPassword(event.target.value)} value={password}/>
                <input type="password" placeholder={"repeat password"} onChange={event => setPasswordRepeat(event.target.value)} value={passwordRepeat}/>
            </div>

            <button onClick={createProfile}>create profile</button>
        </>
    )
}