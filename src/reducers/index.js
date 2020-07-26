import { combineReducers } from "redux";
import CounterReducer from './counterReducer';
import loginReducer from "./loginReducer";
import productListReducer from "./productListReducer";


export default combineReducers ({
    counter : CounterReducer,
    register : loginReducer,
    productList : productListReducer,
        
})
