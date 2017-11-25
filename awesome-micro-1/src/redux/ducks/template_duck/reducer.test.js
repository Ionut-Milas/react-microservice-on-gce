import reducer from "./reducers";
import actions from "./actions";

describe( "quack", () => {
    const quack = actions.quack( );
    const initialState = false;

    const result = reducer( initialState, quack );

    it( "should quack", () => {
        expect( result ).toBe( true );
    } );
} );
