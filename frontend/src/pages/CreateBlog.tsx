import {useState} from "react";
import {postProfile} from "../service/BlogService";
import {useNavigate} from "react-router-dom";

export default function CreateBlog(){

    const[username, setUsername] = useState("");
    const[profileDescription, setProfileDescription] = useState("");
    const[profilePicture, setProfilePicture] = useState("");
    const nav = useNavigate();



    const createProfile = () => {
        postProfile(username, profileDescription, profilePicture)
            .then(()=> nav("/profile/"+ username))
    }

    return(
        <>
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