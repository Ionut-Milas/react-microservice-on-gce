import types from "./types";

const setWindowWidth = ( width ) => ( {
    type: types.WINDOW_RESIZE,
    payload: width
} );

export default {
    setWindowWidth
};
