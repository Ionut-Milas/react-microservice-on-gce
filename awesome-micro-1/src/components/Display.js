import React from "react";
import PropTypes from "prop-types";

const Display = ( { when, children } ) => ( when ? children : ( <noscript /> ) );

const { bool, any } = PropTypes;
Display.propTypes = {
    when: bool,
    children: any
};

export default Display;