import React from 'react'
import {createReduxForm, Field, reduxForm} from 'redux-form'
import {firebaseConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import RenderField from "./RenderField";
import {Link} from "react-router-dom";

class RegistrationForm extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.validSubmit = this.validSubmit.bind(this);
    }

    validSubmit(model) {
        console.log("model", model);
        const {createUser, login} = this.props.firebase;
        console.log("firebase", createUser);
        let profile = Object.assign({}, model);
        delete profile.password;
        createUser({email: model.email, password: model.password}, profile)
            .then(() => {
                login({email: model.email, password: model.password})
                    .then((res) => {
                        console.log("it works you fucker", res);
                        this.props.history.push("/");
                    })
                    .catch((error) => {
                        console.log("FUBAR you fucker", error)
                    });
            })
        // login(model)
        //     .then((res)=>{
        //     console.log("it works you fucker", res);
        //     this.props.history.push("/");
        // })
        //     .catch((error)=>{console.log("FUBAR you fucker", error)});

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
        const {handleSubmit, submitting} = this.props;
        return (
            <form onSubmit={handleSubmit(this.validSubmit)}>
                <Field
                    name="name"
                    type="text"
                    component={RenderField}
                    label="Your name"
                />
                <Field
                    name="email"
                    type="email"
                    component={RenderField}
                    label="Work email"
                />
                <Field
                    name="password"
                    type="password"
                    component={RenderField}
                    label="Password"
                />
                <Field
                    name="company"
                    type="password"
                    component={RenderField}
                    label="Company name"
                />
                <Field
                    name="hires"
                    type="text"
                    component={RenderField}
                    label="Area of hire"
                />
                <Field
                    name="hr"
                    type="radio"
                    component={RenderField}
                    label="I work in HR"
                />
                <Field
                    name="no-hr"
                    type="radio"
                    component={RenderField}
                    label="I don't work in HR"
                />
                <button type="submit" style={{float: "left", width: "200px", marginTop: "20px"}}>Sign up</button>
                <br/>
                <br/>
                <p style={{float: "left"}}>By proceeding you agree to the <Link to="/terms-and-conditions">Terms of
                    service</Link> and <Link to="/privacy-policy">Privacy Policy</Link></p>
            </form>
        )
    }
}

// create new, "configured" function
const createReduxForms = reduxForm({form: 'contact'});

// evaluate it for ContactForm component
RegistrationForm = createReduxForms(RegistrationForm);

export default connect(
    // Map state to props
    ({firebase: {auth, profile}}) => ({
        auth,
        profile
    })
)(firebaseConnect()(RegistrationForm));
