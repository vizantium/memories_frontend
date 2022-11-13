import React from 'react'
import {Container} from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import {Route, Routes, Navigate} from "react-router-dom";
import Auth from "./components/Auth/Auth";
import {gapi} from "gapi-script";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    gapi.load("client:auth2", () => {
        gapi.client.init({
            clientId:
                "68674801310-uv2hrje6r18c30g2lg4o7ba3ivcpm5kf.apps.googleusercontent.com",
            plugin_name: "chat",
        });
    });
    return (
            <Container maxWidth={'xl'}>
                <Navbar/>
                <Routes>
                    <Route path={"/"} element={<Navigate to={'/posts'}/>} />
                    <Route path={'/posts'} element={<Home />}/>
                    <Route path={'/posts/search'} element={<Home />}/>
                    <Route path={'/posts/:id'} element={<PostDetails/>}/>
                    <Route path={"/auth"} element={!user ? <Auth/> : <Navigate to={'/posts'}/>} />
                </Routes>
            </Container>
    );
}

export default App;
