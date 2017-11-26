import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import firebase from 'firebase';
import { reactReduxFirebase, getFirebase, firebaseReducer } from 'react-redux-firebase';

import * as reducers from "./ducks";
import { loadState, saveState } from "./localStorage";
import Helpers from "../support/helpers";
import api from "./middlewares/api";

const firebaseConfig = {
    apiKey: "AIzaSyCuJ6Q4R_gki046rem94y8Mb4T_jO4ZlX4",
    authDomain: "gleaming-idiom-167311.firebaseapp.com",
    databaseURL: "https://gleaming-idiom-167311.firebaseio.com",
    projectId: "gleaming-idiom-167311",
    storageBucket: "gleaming-idiom-167311.appspot.com",
    messagingSenderId: "138059995471"
};

// react-redux-firebase options
const rrfConfig = {
    userProfile: 'users', // firebase root where user profiles are stored
    attachAuthIsReady: true, // attaches auth is ready promise to store
    firebaseStateName: 'firebase', // should match the reducer name ('firebase' is default),
    presence: 'presence', // where list of online users is stored in database
    sessions: 'sessions' // where list of user sessions is stored in database (presence must be enabled)
};
// initialize firebase instance
firebase.initializeApp(firebaseConfig);

export default function configureStore( ) {
    const enhancers = [];
    const loggerMiddleware = createLogger();
    const persistedState = loadState();

    const rootReducer = combineReducers( {
        ...reducers,
        firebase: firebaseReducer,
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
        reactReduxFirebase(firebase, rrfConfig),
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

    // Listen for auth ready (promise available on store thanks to attachAuthIsReady: true config option)
    store.firebaseAuthIsReady.then(() => {
        console.log('Auth has loaded') // eslint-disable-line no-console
    })

    return store;
}
