import React from 'react'
import {createReduxForm, Field, reduxForm} from 'redux-form'
import {firebaseConnect, isEmpty} from "react-redux-firebase";
import {connect} from "react-redux";

import RenderField from "./RenderField";

class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.validSubmit = this.validSubmit.bind(this);
    }

    validSubmit(model) {
        console.log("model", model);
        const {createUser, login} = this.props.firebase;
        console.log("firebase", createUser);
        login(model)
            .then((res)=>{
            console.log("it works you fucker", res);
            // this.props.history.push("/");
        })
            .catch((error)=>{console.log("FUBAR you fucker", error)});

        // handleSignup = (creds) => {
        //     this.setState({
        //         snackCanOpen: true
        //     });
        //     const { createUser, login } = this.props.firebase;
        //     createUser(creds, { email: creds.email, username: creds.username })
        //         .then(() => {
        //             login(creds)
        //         })
        // };
    }


    render() {
        const {handleSubmit, submitting, auth} = this.props;
        let from = "/";
        if (typeof this.props.location !== "undefined" && typeof this.props.location.state !== "undefined") {
            from = this.props.location.state.from;
        }
        if (!isEmpty(auth) === true) {
            if (typeof this.props.history !== "undefined"){
                this.props.history.replace(from);
            }
        }
        return (
            <form onSubmit={handleSubmit(this.validSubmit)}>
                <Field
                    name="email"
                    type="text"
                    component={RenderField}
                    label="Username"
                />
                <Field
                    name="password"
                    type="password"
                    component={RenderField}
                    label="Password"
                />
                <button type="submit">Submit</button>
            </form>
        )
    }
}

// create new, "configured" function
const createReduxForms = reduxForm({form: 'Login'});

// evaluate it for ContactForm component
LoginForm = createReduxForms(LoginForm);

export default connect(
    // Map state to props
    ({firebase: {auth, profile}}) => ({
        auth,
        profile
    })
)(firebaseConnect()(LoginForm));
