import React, { Component } from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import Loadable from 'react-loadable';
import logo from './logo.svg';
import './Main.css';
import MyLoadingComponent from "../components/AsyncComponent";
import PrivateRoute from "../components/PrivateRoute";
import Blog from "../components/Blog";

const AsyncHome = Loadable({
    loader: () => import("../components/Home"),
    loading: MyLoadingComponent,
    delay: 300, // 0.3 seconds
    timeout: 10000 // 10 seconds
});
const AsyncBlog = Loadable({
    loader: () => import("../components/Blog"),
    loading: MyLoadingComponent,
    delay: 300, // 0.3 seconds
    timeout: 10000 // 10 seconds
});
const AsyncLogin = Loadable({
    loader: () => import("../components/forms/Login"),
    loading: MyLoadingComponent,
    delay: 300, // 0.3 seconds
    timeout: 10000 // 10 seconds
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
                            {/*<Route path="/blog" component={AsyncBlog} />*/}
                            {/*<PrivateRoute path='/blog' component={AsyncBlog} />*/}
                            <PrivateRoute path='/blog' component={Blog} />
                            <Route path='/login' component={AsyncLogin} />
                            <Route component={AsyncNotFound} />
                        </Switch>
                    </main>
                </div>
            </div>
        );
    }
}

export default Main;
