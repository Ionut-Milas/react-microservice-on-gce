import React from "react";
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {firebaseConnect, isEmpty, isLoaded, pathToJS} from "react-redux-firebase";

class Login extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { auth } = this.props;
        let from = "/"
        if (typeof this.props.location !== "undefined" && typeof this.props.location.state !== "undefined") {
            from = this.props.location.state.from;
        }
        if (!isEmpty(auth) === true) {
            if (typeof this.props.history !== "undefined"){
                this.props.history.replace(from);
            }
        }

        return (
            <div>
                <p>You must log in to view the page</p>
                <button disabled={!isEmpty(this.props.auth)} onClick={() => login(this.props.firebase)}>Login</button>
            </div>
        )
    }
}

// Works same with class components (make sure you import Component from react)
// class SomeComponent extends Component {
//   render() {
//     // use this.props.firebase
//   }
// }
export default connect(
    // Map state to props
    ({firebase: {auth, profile}}) => ({
        auth,
        profile
    })
)(firebaseConnect()(Login));

function login(fr) {
    fr.login({
        email: 'milasionut@yahoo.com',
        password: 'qazwsx'
    })
}