import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./redux/store";
import './index.css';
import App from './container/App';
import registerServiceWorker from './registerServiceWorker';

// Let the reducers handle initial state
const initialState = {};
const store = configureStore( initialState );

ReactDOM.render(
    <Provider store={ store }>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById( "root" )
);
registerServiceWorker();