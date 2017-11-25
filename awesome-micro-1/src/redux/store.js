import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { reactReduxFirebase, getFirebase, firebaseStateReducer } from 'react-redux-firebase';

import * as reducers from "./ducks";
import { loadState, saveState } from "./localStorage";
import Helpers from "../support/helpers";
import api from "./middlewares/api";

const fbConfig = {
    apiKey: "AIzaSyCuJ6Q4R_gki046rem94y8Mb4T_jO4ZlX4",
    authDomain: "gleaming-idiom-167311.firebaseapp.com",
    databaseURL: "https://gleaming-idiom-167311.firebaseio.com",
    projectId: "gleaming-idiom-167311",
    storageBucket: "gleaming-idiom-167311.appspot.com",
    messagingSenderId: "138059995471"
};

export default function configureStore( ) {
    const enhancers = [];
    const loggerMiddleware = createLogger();
    const persistedState = loadState();

    const rootReducer = combineReducers( {
        ...reducers,
        firebase: firebaseStateReducer,
        form: reduxFormReducer
    } );

    const middleware = [
        api,
        loggerMiddleware,
        thunk.withExtraArgument(getFirebase)
    ];

    if ( process.env.NODE_ENV === "development" ) {
        const devToolsExtension = window.devToolsExtension;

        if ( typeof devToolsExtension === "function" ) {
            enhancers.push( devToolsExtension() );
        }
    }

    const composedEnhancers = compose(
        applyMiddleware( ...middleware ),
        reactReduxFirebase(fbConfig, { userProfile: 'users', enableLogging: false }),
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
