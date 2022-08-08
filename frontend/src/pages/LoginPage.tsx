import {FormEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {loginUser} from "../service/BlogService";
import "./LoginPage.css"
import {Button, createTheme, TextField, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        secondary: {
            main: '#FEFBE7',
        },
    },
});

export default function LoginPage(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const nav = useNavigate()

    const login = (ev: FormEvent) => {
        ev.preventDefault()
        loginUser({username, password})
            .then(loginResponse => localStorage.setItem('jwt', loginResponse.jwt))
            .then(() => nav(`/profile`))
            .catch(() => setErrorMessage('Login failed'))
    }

    return (
        <div className={"formwrapper"}>
            <img src={process.env.PUBLIC_URL + '/logo.png'} width={"120px"} />
            <h2>Login</h2>
                <form onSubmit={login}>
                    <div>
                        <TextField variant="filled" size="small" type="text" value={username} onChange={ev => setUsername(ev.target.value)} placeholder="Username" />
                    </div>
                    <div >
                    <TextField  variant="filled" size={"small"} type="password" value={password} onChange={ev => setPassword(ev.target.value)} placeholder="Password" />
                    </div>
                    <div className={"divSpacer"}>
                        <ThemeProvider theme={theme}>
                            <Button color={"secondary"} size={"small"} variant={"contained"} type="submit" >login</Button>
                        </ThemeProvider>
                    </div>
                </form>

                { errorMessage && <div>{errorMessage}</div> }
            You don't have an account? <Link className={"planeLink"}  to="/register">Get one here</Link>

        </div>
    )
}