// read about Object.prototype.toString.call at https://toddmotto.com/understanding-javascript-types-and-reliable-type-checking/#true-object-types
import Cookies from "universal-cookie";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL || "https://jsonplaceholder.typicode.com";

function requestHeaders( extraHeaders ) {
    return Object.assign(
        { },
        addHeaders(),
        extraHeaders
    );
}

export default ( url, method, extraHeaders, body ) => {
    const details = {
        baseURL,
        method,
        url,
        data: body,
        headers: requestHeaders( extraHeaders ),
        responseType: "json" // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream',
    };
    return axios( details );
};

function addHeaders() {
    if ( typeof document !== "undefined" ) {
        const cookies = new Cookies();
        const sessionId = cookies.get( "sessionId" );
        console.log( "sessionId", sessionId );
        if ( typeof sessionId !== "undefined" ) {
            return {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Basic ${ sessionId }`
            };
        }
    }
    return {
        // Accept: "application/json",
        // "Content-Type": "application/json"
    };
}
