import { PRODUCT_LIST } from './types';

export const productListCall = (payload) => {

    return {
        type: PRODUCT_LIST,
        payload: payload
    }
}