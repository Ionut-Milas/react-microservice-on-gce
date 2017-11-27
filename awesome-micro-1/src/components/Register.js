import React from "react";
import RegistrationForm from "./forms/RegistrationForm";

class Register extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        return(
            <div>
                <div style={{float: "left", width: "50%"}}>
                    <h1>LIONSTEP</h1>
                    <p>Faster time-to-hire and reduced complexity</p>
                    <p>Automation combined with manual curation</p>
                    <p>Transparent process for autp & manual curation</p>
                </div>
                <div style={{float: "right", width: "50%"}}>
                    <RegistrationForm />
                </div>
            </div>
        )
    }
}

export default Register;
