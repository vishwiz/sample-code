import { combineReducers } from "redux";
import CounterReducer from './counterReducer';
import loginReducer from "./loginReducer";


export default combineReducers ({
    counter : CounterReducer,
    register : loginReducer
        
})
