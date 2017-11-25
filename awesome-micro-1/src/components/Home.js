import React from "react";
import {firebaseConnect, isLoaded, isEmpty, populate} from 'react-redux-firebase'
import {connect} from "react-redux";
import {compose} from "redux";

const Home = () => (
    <h1>Homepage</h1>
);

const populates = [
    { child: 'owner', root: 'users' },
    // or if you want a param of the populate child such as user's display name
    // { child: 'owner', root: 'users', childParam: 'displayName' }
];

export default compose(
    // gather projects and matching owners from firebase and place into redux
    firebaseConnect([
        { path: 'users', populates },
    ]),
    // projects with owner populated from redux into component props
    connect(
        ({ firebase }) => ({
            projects: populate(firebase, 'users', populates),
        })
    )
)(Home)