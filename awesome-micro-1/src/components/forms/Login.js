import React from 'react'
import fakeAuth from "../../support/fakeAuth";
import {Switch, history} from "react-router-dom";
import { Redirect } from 'react-router';
class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            redirectToReferrer: false
        };
        this.login = this.login.bind(this);
    }

    login = () => {
        fakeAuth.authenticate(() => {
            this.setState(() => ({
                redirectToReferrer: true
            }))
        })
    };
    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer === true) {
            this.props.history.replace(from);
        }

        return (
            <div>
                <p>You must log in to view the page</p>
                <button onClick={this.login}>Log in</button>
            </div>
        )
    }
}

export default Login