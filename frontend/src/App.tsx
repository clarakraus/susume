import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import CreateBlog from "./pages/CreateBlog";
import Blog from "./pages/Blog";
import AddPage from "./pages/AddPage";
import LoginPage from "./pages/LoginPage";
import FriendPage from "./pages/FriendPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<LoginPage/>}/>
                <Route path={"/register"} element={<CreateBlog/>}/>
                <Route path={"/profile"} element={<Blog/>}/>
                <Route path={"/profile/:username"} element={<FriendPage/>}/>
                <Route path={"/profile/addnew/:movieId"} element={<AddPage/>}/>
            </Routes>
        </BrowserRouter>
    )

}


