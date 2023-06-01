import React from 'react'
import ReactDOM from 'react-dom'

import {Provider} from 'react-redux'
import {createStore, applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'

import App from './App'
import reducers from './reducers'



import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";
import "./assets/css/custom-style.css";

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store = {store}>
        <App/>
    </Provider>,document.getElementById("root"))