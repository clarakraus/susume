import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import CreateBlog from "./pages/CreateBlog";
import Blog from "./pages/Blog";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<CreateBlog/>}/>
                <Route path={"/profile/:username"} element={<Blog/>}/>
            </Routes>
        </BrowserRouter>
    )

}


