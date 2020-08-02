import { combineReducers } from "redux";
import CounterReducer from './counterReducer';
import loginReducer from "./loginReducer";
import productListReducer from "./productListReducer";
import userOrderAndDeliveryReducer from "./userOrderAndDeliveryReducer";


export default combineReducers ({
    counter : CounterReducer,
    register : loginReducer,
    productList : productListReducer,
    userOrderAndDeliveryReducer : userOrderAndDeliveryReducer
        
})
