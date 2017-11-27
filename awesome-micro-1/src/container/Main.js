import React, { Component } from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import Loadable from 'react-loadable';
import logo from './logo.svg';
import './Main.css';
import MyLoadingComponent from "../components/AsyncComponent";

const AsyncHome = Loadable({
    loader: () => import("../components/Home"),
    loading: MyLoadingComponent
});
const AsyncBlog = Loadable({
    loader: () => import("../components/Blog"),
    loading: MyLoadingComponent
});
const AsyncNotFound = Loadable({
    loader: () => import("../components/NotFound"),
    loading: MyLoadingComponent
});

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
                            <Route path="/" exact component={AsyncHome} />
                            <Route path="/blog" component={AsyncBlog} />
                            <Route component={AsyncNotFound} />
                        </Switch>
                    </main>
                </div>
            </div>
        );
    }
}

export default Main;
