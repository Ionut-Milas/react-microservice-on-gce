import React, {Component} from "react";
import Login from "./Login";
import {connect} from "react-redux";
import {firebaseConnect, isEmpty, isLoaded, pathToJS} from "react-redux-firebase";


class Home extends Component {
    render() {
        const {auth, profile} = this.props;
        const a = isEmpty(auth) ? "User not logged in": "";
        const b = isEmpty(auth) ? "": "User data:";
        const c = isLoaded(auth) && !isEmpty(profile) ? <pre>{JSON.stringify(profile, null, 2)}</pre> : <pre>{JSON.stringify(profile, null, 2)}</pre>;
        return (
            <div>
                <h1>Homepage</h1>
                <Login/>
                { a }
                { b }
                { c }
            </div>
        )
    }
}

export default connect(
    // Map state to props
    ({ firebase: { auth, profile } }) => ({
        auth,
        profile
    })
)(firebaseConnect()(Home));

