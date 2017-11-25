import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import * as reducers from "./ducks";
import { loadState, saveState } from "./localStorage";
import Helpers from "../support/helpers";
import api from "./middlewares/api";

export default function configureStore( ) {
    const enhancers = [];
    const loggerMiddleware = createLogger();
    const persistedState = loadState();

    const rootReducer = combineReducers( {
        ...reducers,
        form: reduxFormReducer
    } );

    const middleware = [
        api,
        loggerMiddleware,
        thunk
    ];

    if ( process.env.NODE_ENV === "development" ) {
        const devToolsExtension = window.devToolsExtension;

        if ( typeof devToolsExtension === "function" ) {
            enhancers.push( devToolsExtension() );
        }
    }

    const composedEnhancers = compose(
        applyMiddleware( ...middleware ),
        ...enhancers,
    );

    const store = createStore(
        rootReducer,
        persistedState,
        composedEnhancers
    );

    store.subscribe( () => {
        Helpers.throttle( saveState( {
        } ), 1000 );
    } );
    return store;
}
