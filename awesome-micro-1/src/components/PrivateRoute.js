import React from "react";
import {Redirect, Route, withRouter} from "react-router-dom";
import fakeAuth from "../support/fakeAuth";
import {connect} from "react-redux";
import {firebaseConnect, isEmpty} from "react-redux-firebase";

const PrivateRoute = ({ component: Component, ...rest, auth }) => (
    <Route {...rest} render={(props) => (
        !isEmpty(auth) === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
    )} />
);
export default connect(
    // Map state to props
    ({ firebase: { auth, profile } }) => ({
        auth,
        profile
    })
)(firebaseConnect()(PrivateRoute));