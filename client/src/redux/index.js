import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'


import questions from './question'


const rootReducer = combineReducers({ questions })


export default createStore(
    rootReducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), 
    applyMiddleware(thunk))