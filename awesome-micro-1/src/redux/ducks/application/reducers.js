import { combineReducers } from "redux";
import types from "./types";

/* State shape

{
    redirectTo: string,
    busy: {
        general: bool,
        page: bool
    }
}

*/

// const redirectReducer = ( state = "", action ) => {
//     if ( action.type.endsWith( "_REDIRECTED" ) ) {
//         return action.payload;
//     }
//
//     return state;
// };

const generalReducer = ( state = 0, action ) => {
    if ( action.type.endsWith( "_REDIRECTED" ) ) {
        return state - 1;
    }

    if ( !action.async || !action.generalFetching ) {
        return state;
    }

    if ( action.type.endsWith( "_COMPLETED" ) || action.type.endsWith( "_FAILED" ) ) {
        return state - 1;
    }

    return state + 1;
};

const windowSizeReducer = ( state = 0, action ) => {
    if ( action.type === types.WINDOW_RESIZE ) {
        return action.payload;
    }
    return state;
};

const busy = combineReducers( {
    general: generalReducer
} );

const applicationReducer = combineReducers( {
    busy,
    windowSize: windowSizeReducer
} );

export default applicationReducer;
