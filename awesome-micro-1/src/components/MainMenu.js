import React from "react";
import {Link} from "react-router-dom";
import Display from "./Display";
import {firebaseConnect, isEmpty, isLoaded, pathToJS} from "react-redux-firebase";
import {connect} from "react-redux";

// const {auth, profile} = this.props;
// const a = isEmpty(auth) ? "User not logged in": "";
// const b = isEmpty(auth) ? "": "User data:";
// const c = isLoaded(auth) && !isEmpty(profile) ? <pre>{JSON.stringify(profile, null, 2)}</pre> : <pre>{JSON.stringify(profile, null, 2)}</pre>;

const MainMenu = ({auth, firebase}) => (
    <div className="menu">
        <div>{isEmpty(auth)}</div>
        <Display when={!isEmpty(auth)}>
            <Link to="/">Dashboard</Link>
            <Link to="/blog">Talent Pool</Link>
            <Link to="/blog">Messages</Link>
            <Link to="/blog">Settings</Link>
            <Link to="/blog">12 Credits</Link>
            <Link to="/blog">Buy Credits</Link>
            <Link to="#" disabled={isEmpty(auth)} onClick={()=>logout(firebase)}>Logout</Link>
        </Display>
        <Display when={isEmpty(auth)}>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </Display>
    </div>
);

export default connect(
    // Map state to props
    ({ firebase: { auth, profile } }) => ({
        auth,
        profile
    })
)(firebaseConnect()(MainMenu));

function logout(fr) {
    // const userRef = new fr('https://gleaming-idiom-167311.firebaseio.com/presence/' + fr.User);
    fr.logout();
    fr.ref('presence/' + fr.auth().currentUser.uid).set(false);
}