import types from "./types";

const quack = ( ) => ( {
    type: types.QUACK
} );

const swim = ( distance ) => ( {
    type: types.SWIM,
    payload: {
        distance
    }
} );

const fly = ( ) => ( {
    type: types.LOGIN,
    async: true,
    generalFetching: true,
    external: true, // set this flag only if you connect to a 3rd party api.
    payload: {
        path: "/over/the/rainbow",
        method: "GET"
    }
} );

export default {
    swim,
    quack,
    fly
};
