import {Avatar} from "@mui/material";
import "./BlogComponent.css"

interface BlogProps{
    username: string
    profilePicture: string
    profileDescription: string
 //   friendsList: Array<FriendItem>

}

export default function BlogComponent(props: BlogProps){
    const username = props.username
    const picture = props.profilePicture
    const description = props.profileDescription

    return(
        <>
            <div className={"blog"} >
                <div className={"blogDiv"}>
                    <Avatar src={picture} alt="profile avatar" sx={{ width: 150, height: 150 }}/>
                </div>

                    <div>
                        <h3 className={"blogDiv"}>
                            {username}
                        </h3>
                        <div className={"blogDiv"}>
                            {description}
                        </div>
                    </div>
            </div>

        </>
    )
}