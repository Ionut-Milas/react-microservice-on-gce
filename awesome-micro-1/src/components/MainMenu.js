import React from "react";
import {Link} from "react-router-dom";
import Display from "./Display";
import {firebaseConnect, isEmpty, isLoaded, pathToJS} from "react-redux-firebase";
import {connect} from "react-redux";

const MainMenu = ({auth, firebase}) => (
    <div className="menu">
        <div>{isEmpty(auth)}</div>
        <Display when={!isEmpty(auth)}>
            <Link to="/">Home</Link>
            <Link to="/blog">Main</Link>
            <button disabled={isEmpty(auth)} onClick={()=>logout(firebase)}>Logout</button>
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