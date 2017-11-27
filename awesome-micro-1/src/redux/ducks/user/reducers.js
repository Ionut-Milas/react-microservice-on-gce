import types from "./types";

/* State shape

{
    quacked: true/false,
    ...
}

*/

const initialState = {
    quacked: false
};

const duckReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case types.QUACK: return true;
        default: return state;
    }
};

export default duckReducer;
