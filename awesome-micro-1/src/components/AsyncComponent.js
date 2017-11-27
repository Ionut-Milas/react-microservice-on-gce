import React from "react";

const MyLoadingComponent = (props) => {
    // Handle the loading state
    if (props.error) {
        return <div>Error!</div>;
    } else if (props.timedOut) {
        return <div>Taking a long time...</div>;
    } else if (props.pastDelay) {
        return <div>Loading...</div>;
    } else {
        return null;
    }
};

export default MyLoadingComponent;