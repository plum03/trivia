import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import player from "./authorization";


import questions from './question'

console.log(player);
const rootReducer = combineReducers({ 
    questions,
    player

 })


export default createStore(
    rootReducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), 
    applyMiddleware(thunk))