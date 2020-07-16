import { combineReducers } from "redux";
import CounterReducer from './counterReducer';


export default combineReducers ({
    counter : CounterReducer
        
})
