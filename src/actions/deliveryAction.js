import {
    PICK_UP_POINT_LIST, SAVE_PICK_UP_POINT_LIST, PIN_CODE_CALL, ADD_ADDRESS, SELECT_ADDRESS,
    REMOVE_ALL, REMOVE_INDEX_ELEMENT, INCREMENT_DECREMENT_VALUE, INITIALIZE_VIEWCART_DATA
} from './types';

export const pickUpPointList = (payload) => {

    return {
        type: PICK_UP_POINT_LIST,
        payload: payload
    }
}

export const savePickUpPointList = (payload) => {

    return {
        type: SAVE_PICK_UP_POINT_LIST,
        payload: payload
    }
}

export const initializeViewCartData = (payload) => {


    return {
        type: INITIALIZE_VIEWCART_DATA,
        payload: payload
    }
}

export const removeAll = (payload) => {

    return {
        type: REMOVE_ALL,
        payload: payload
    }
}
export const removeIndexElement = (payload) => {
    return {
        type: REMOVE_INDEX_ELEMENT,
        payload: payload
    }
}
export const incrementDecrementValue = (payload) => {
    return {
        type: INCREMENT_DECREMENT_VALUE,
        payload: payload
    }
}
export const pincodeCall = (payload) => {

    return {
        type: PIN_CODE_CALL,
        payload: payload
    }
}

export const addAddress = (payload) => {

    console.log("payload : ", payload)
    return {
        type: ADD_ADDRESS,
        payload: payload
    }
}

export const selectAddress = (payload) => {

    return {
        type: SELECT_ADDRESS,
        payload: payload
    }
}

