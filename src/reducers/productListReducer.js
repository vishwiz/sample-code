import * as types from '../actions/types';
import baseProductSettings from '../../baseSettings';



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

    // placeOrderDetails: [],
    // placeOrder_success: false,
    // placeOrder_failure: false,

    productSettings: baseProductSettings,
    product_settings_success: false,
    product_settings_failure: false,

    myOrdersDetails: [],
    myOrders_success: false,
    myOrders_failure: false,

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

        case types.MY_ORDERS:
            return {
                ...state,
                isLoading: true,
                myOrders_success: false,
                myOrders_failure: false,
                errorMessage: "",
                myOrdersDetails:[]
            }
        case types.MY_ORDERS_SUCCESS:
            return {
                ...state,
                myOrdersDetails: action.payload.ResponseData,
                isLoading: false,
                myOrders_success: true,

            }
        case types.MY_ORDERS_FAILURE:
            return {
                ...state,
                isLoading: false,
                myOrders_failure: true,
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

        case types.PRODUCT_SETTING:
            return {
                ...state,
                isLoading: true,
                product_settings_success: false,
                product_settings_failure: false,
                errorMessage: ""
            }
        case types.PRODUCT_SETTING_SUCCESS:

            let data = {};
            action.payload.ResponseData.forEach(element => {
                data[element.settingName] = element.settingValue;
            });
            return {
                ...state,
                productSettings: data,
                isLoading: false,
                product_settings_success: true,

            }
        case types.PRODUCT_SETTING_FAILURE:
            return {
                ...state,
                isLoading: false,
                product_settings_failure: true,
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