import React, {useState} from "react";
import {postProfile} from "../service/BlogService";
import {useNavigate} from "react-router-dom";

export default function CreateBlog(){

    const[username, setUsername] = useState("");
    const[profileDescription, setProfileDescription] = useState("");
    const[profilePicture, setProfilePicture] = useState("https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg");
    const nav = useNavigate();
    const [message, setMessage] = useState("")



    const createProfile = () => {
        if(username) {
            postProfile(username, profileDescription, profilePicture)
                .then(() => nav("/profile/" + username))
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
                <input type="text" placeholder="tell us something about yourself"
                       onChange={event => setProfileDescription(event.target.value)}/>
            </div>

            <div>
                <input type="picture" placeholder="upload your picture here" onChange={event => setProfilePicture(event.target.value)}/>
            </div>

            <button onClick={createProfile}>create profile</button>
        </>
    )
}