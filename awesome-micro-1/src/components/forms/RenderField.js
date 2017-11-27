import React from "react";

const RenderField = ({
                         input,
                         label,
                         type,
                         meta: {asyncValidating, touched, error}
                     }) => (
    <div style={{textAlign: "left", marginTop: "15px"}}>
        <label>{label}</label>
        <div className={asyncValidating ? 'async-validating' : ''}>
            <input style={{width: "300px"}} {...input} type={type} placeholder={label}/>
            {touched && error && <span>{error}</span>}
        </div>
    </div>
);

export default RenderField;