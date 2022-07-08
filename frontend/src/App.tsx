import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import CreateBlog from "./pages/CreateBlog";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CreateBlog/>}/>
            </Routes>
        </BrowserRouter>
    )

}


