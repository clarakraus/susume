import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import CreateBlog from "./pages/CreateBlog";
import Blog from "./pages/Blog";
import AddPage from "./pages/AddPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<CreateBlog/>}/>
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/profile/:username"} element={<Blog/>}/>
                <Route path={"profile/:blogname/addnew/:movieId"} element={<AddPage/>}/>
            </Routes>
        </BrowserRouter>
    )

}


