import React, {Component} from "react";
import Login from "./Login";
import {connect} from "react-redux";
import {firebaseConnect, isEmpty, isLoaded, pathToJS} from "react-redux-firebase";


class Home extends Component {
    render() {
        return (
            <div>
                <h1>Homepage</h1>
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

