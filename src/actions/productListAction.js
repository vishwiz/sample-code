import { PRODUCT_LIST, ADD_TO_CART, ADD_TO_CART_LIST_DATA , CAROUSEl_DATA, SEARCH_TEXT } from './types';

export const productListCall = (payload) => {

    return {
        type: PRODUCT_LIST,
        payload: payload
    }
}

export const addtoCartListCall = (payload) => {

    return {
        type: ADD_TO_CART,
        payload: payload
    }
}

export const addtoCartListCompleteData = (payload) => {

    return {
        type: ADD_TO_CART_LIST_DATA,
        payload: payload
    }
}

export const carouselDataCall = (payload) => {

    return {
        type: CAROUSEl_DATA,
        payload: payload
    }
}

export const searchTextValue = (payload) => {

    return {
        type: SEARCH_TEXT,
        payload: payload
    }
}