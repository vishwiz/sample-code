import {PRODUCT_LIST ,PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAILURE} from '../actions/types';


const initialState = {
    isLoading: false,
    productList_success: false,
    productList_failure: false,
    errorMessage: "",
    productListDetails: []
};

export default (state = initialState, action) => {

    switch (action.type) {

        case PRODUCT_LIST:
            return {
                ...state,
                isLoading: true,
                productList_success: false,
                productList_failure: false,
                errorMessage: ""
            }
        case PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                productListDetails: action.payload.ResponseData,
                isLoading: false,
                productList_success: true,

            }
        case PRODUCT_LIST_FAILURE:
            return {
                ...state,
                isLoading: false,
                productList_failure: true,
                errorMessage: action.payload.ErrorMessage
            }

        default:
            return state;

    }

}