import React from "react";
import {Link} from "react-router-dom";
import Display from "./Display";
import {firebaseConnect, isEmpty, isLoaded, pathToJS} from "react-redux-firebase";

const MainMenu = ({auth}) => (
    <div className="menu">
        <pre>{auth}</pre>
        <Display when={!isEmpty(auth)}>
            <Link to="/">Home</Link>
            <Link to="/blog">Main</Link>
            <Link to="/logout">Logout</Link>
        </Display>
        <Display when={isEmpty(auth)}>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </Display>
    </div>
);

export default MainMenu;
