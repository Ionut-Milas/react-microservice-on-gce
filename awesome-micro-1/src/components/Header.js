import React from "react";
import logo from '../logo.svg';

import MainMenu from "./MainMenu";
const Header = ({auth}) => (
    <header className="App-header">
        <div className="logo">LIONSTEP</div>
        <MainMenu/>
    </header>
);

export default Header;
