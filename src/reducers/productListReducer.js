import * as types from '../actions/types';
// {PRODUCT_LIST ,PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAILURE} 



const initialState = {
    isLoading: false,
    errorMessage: "",

    productListDetails: [],
    productList_success: false,
    productList_failure: false,

    addToCartListDetails: [],
    addToCartList_success: false,
    addToCartList_failure: false,

    // addToCartListData: [],

    carouselDataDetails: [],
    carouselData_success: false,
    carouselData_failure: false,

    placeOrderDetails: [],
    placeOrder_success: false,
    placeOrder_failure: false,

    searchData: {}
};

export default (state = initialState, action) => {

    switch (action.type) {

        case types.PRODUCT_LIST:
            return {
                ...state,
                isLoading: true,
                productList_success: false,
                productList_failure: false,
                errorMessage: ""
            }
        case types.PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                productListDetails: action.payload.ResponseData,
                isLoading: false,
                productList_success: true,

            }
        case types.PRODUCT_LIST_FAILURE:
            return {
                ...state,
                isLoading: false,
                productList_failure: true,
                errorMessage: action.payload.ErrorMessage
            }

        case types.ADD_TO_CART:
            return {
                ...state,
                isLoading: true,
                addToCartList_success: false,
                addToCartList_failure: false,
                errorMessage: ""
            }
        case types.ADD_TO_CART_SUCCESS:
            return {
                ...state,
                addToCartListDetails: action.payload.ResponseData,
                isLoading: false,
                addToCartList_success: true,

            }
        case types.ADD_TO_CART_FAILURE:
            return {
                ...state,
                isLoading: false,
                addToCartList_failure: true,
                errorMessage: action.payload.ErrorMessage
            }

            case types.PLACE_ORDER:
                return {
                    ...state,
                    isLoading: true,
                    placeOrder_success: false,
                    placeOrder_failure: false,
                    errorMessage: ""
                }
            case types.PLACE_ORDER_SUCCESS:
                return {
                    ...state,
                    placeOrderDetails: action.payload.ResponseData,
                    isLoading: false,
                    placeOrder_success: true,
    
                }
            case types.PLACE_ORDER_FAILURE:
                return {
                    ...state,
                    isLoading: false,
                    placeOrder_failure: true,
                    errorMessage: action.payload.ErrorMessage
                }
        case types.CAROUSEl_DATA:
            return {
                ...state,
                isLoading: true,
                carouselData_success: false,
                carouselData_failure: false,
                errorMessage: ""
            }
        case types.CAROUSEl_DATA_SUCCESS:
            return {
                ...state,
                carouselDataDetails: action.payload.ResponseData,
                isLoading: false,
                carouselData_success: true,

            }
        case types.CAROUSEl_DATA_FAILURE:
            return {
                ...state,
                isLoading: false,
                carouselData_failure: true,
                errorMessage: action.payload.ErrorMessage
            }

        case types.SEARCH_TEXT:
            return {
                ...state,
                searchData: action.payload
            }

        case types.CLEAR_LIST_DATA:
            return {
                ...state,
                addToCartListDetails: [],
                addToCartList_success: false,
                addToCartList_failure: false,
            }

        default:
            return state;

    }

}