import React from "react";
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {firebaseConnect, isEmpty, isLoaded, pathToJS} from "react-redux-firebase";

const SomeComponent = (props) => (
    // use props.firebase
    <div>
        <button disabled={!isEmpty(props.auth)} onClick={()=>login(props.firebase)}>Login</button>
        <button disabled={isEmpty(props.auth)} onClick={()=>logout(props.firebase)}>Logout</button>
    </div>
);

// Works same with class components (make sure you import Component from react)
// class SomeComponent extends Component {
//   render() {
//     // use this.props.firebase
//   }
// }
export default connect(
    // Map state to props
    ({ firebase: { auth, profile } }) => ({
        auth,
        profile
    })
)(firebaseConnect()(SomeComponent));

function login(fr) {
    fr.login({
        email: 'milasionut@yahoo.com',
        password: 'qazwsx'
    })
}
function logout(fr) {
    // const userRef = new fr('https://gleaming-idiom-167311.firebaseio.com/presence/' + fr.User);
    fr.logout();
    fr.ref('presence/' + fr.auth().currentUser.uid).set(false);
}