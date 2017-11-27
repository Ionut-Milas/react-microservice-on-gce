import React from "react";
import {Redirect, Route, withRouter} from "react-router-dom";
import fakeAuth from "../support/fakeAuth";
import {connect} from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        fakeAuth.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
    )} />
);

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth
    }
};

export default withRouter(connect(mapStateToProps)(PrivateRoute))