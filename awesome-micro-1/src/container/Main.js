import React, { Component } from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'

import logo from './logo.svg';
import './Main.css';
import Home from "../components/Home";
import Blog from "../components/Blog";

class Main extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to Awesome Microservice Blog</h1>
                    <Link to="/">Home</Link>
                    <Link to="/blog">Blog</Link>
                </header>
                <div className="App-intro">
                    <main>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/blog" exact component={Blog} />
                        </Switch>
                    </main>
                </div>
            </div>
        );
    }
}

export default Main;
