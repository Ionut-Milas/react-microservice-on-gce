import types from "./types";

const login = ( payload ) => ( {
    type: types.LOGIN,
    payload: {
        payload
    }
} );

export default {
    login
};
