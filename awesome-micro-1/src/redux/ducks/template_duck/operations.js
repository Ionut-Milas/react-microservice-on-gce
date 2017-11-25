import actions from "./actions";

// This is a link to an action defined in actions.js.
const simpleQuack = actions.quack;

// This is a thunk which dispatches multiple actions from actions.js (side-effects)
const complexQuack = ( distance ) => ( dispatch ) => {
    dispatch( actions.quack( ) ).then( ( ) => {
        dispatch( actions.swim( distance ) );
        dispatch( /* any action */ );
    } );
};

export default {
    simpleQuack,
    complexQuack
};
