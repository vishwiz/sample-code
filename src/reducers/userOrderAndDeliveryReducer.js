import * as types from '../actions/types';

const initialState = {
    isLoading: false,
    errorMessage: "",

    pickUpPointListArray: [],
    pickUpPointList_success: false,
    pickUpPointList_failure: false,

    SavePickUpPointList: {},
    pinCodeDetails: {},
    OrderSummaryItemArray: [],
    totalItem: 0,
    totalPaymentedValue: 0,
    totalSaving: 0,


    addressDetailsValue: [],
    addAddress_success: false,
    addAddress_failure: false,
    getAddress_success: false,
    getAddress_failure: false,

    selectedAddress: {},

    placeOrderDetails: [],
    placeOrder_success: false,
    placeOrder_failure: false,

    isLoadingCancelOrder: false,
    cancelAddressDetails: {},
    cancelAddress_success: false,
    cancelAddress_failure: false,
    errorMessageCancelOrder: ""

};

export default (state = initialState, action) => {

    switch (action.type) {

        case types.PICK_UP_POINT_LIST:
            return {
                ...state,
                isLoading: true,
                pickUpPointList_success: false,
                pickUpPointList_failure: false,
                errorMessage: ""
            }
        case types.PICK_UP_POINT_LIST_SUCCESS:
            return {
                ...state,
                pickUpPointListArray: action.payload.ResponseData,
                isLoading: false,
                pickUpPointList_success: true,

            }
        case types.PICK_UP_POINT_LIST_FAILURE:
            return {
                ...state,
                isLoading: false,
                pickUpPointList_failure: true,
                errorMessage: action.payload.ErrorMessage
            }

        case types.SAVE_PICK_UP_POINT_LIST:
            return {
                ...state,
                SavePickUpPointList: action.payload
            }

        case types.INITIALIZE_VIEWCART_DATA:
            return {
                ...state,
                totalItem: action.payload.totalItem,
                totalPaymentedValue: action.payload.totalPaymentedValue,
                totalSaving: action.payload.totalSaving
            }

        case types.REMOVE_ALL:
            return {
                ...state,
                OrderSummaryItemArray: [],
                totalItem: 0,
                totalPaymentedValue: 0,
                totalSaving: 0

            }
        case types.REMOVE_INDEX_ELEMENT:
            return {
                ...state,
                OrderSummaryItemArray: action.payload.data,
                totalItem: action.payload.totalItem,
                totalPaymentedValue: action.payload.totalPaymentedValue,
                totalSaving: action.payload.totalSaving
            }

        case types.INCREMENT_DECREMENT_VALUE:

            return {
                ...state,
                OrderSummaryItemArray: action.payload.data,
                totalItem: action.payload.totalItem,
                totalPaymentedValue: action.payload.totalPaymentedValue,
                totalSaving: action.payload.totalSaving
            }

        case types.PIN_CODE_CALL_SUCCESS:
            return {
                ...state,
                pinCodeDetails: action.payload.ResponseData,
                // isLoading: false,
                // pickUpPointList_success: true,

            }
        case types.PIN_CODE_CALL_FAILURE:
            return {
                ...state,
                // isLoading: false,
                // pickUpPointList_failure: true,
                // errorMessage: action.payload.ErrorMessage
            }

        case types.PIN_CODE_CALL:
            return {
                ...state,
                pinCodeDetails: {}
            }


        case types.ADD_ADDRESS:
            return {
                ...state,
                isLoading: true,
                addAddress_success: false,
                addAddress_failure: false
            }
        case types.ADD_ADDRESS_SUCCESS:
            return {
                ...state,
                addAddress_success: true,
                addAddress_failure: false,
                isLoading: false
            }
        case types.ADD_ADDRESS_FAILURE:
            return {
                ...state,
                isLoading: false,
                addAddress_success: false,
                addAddress_failure: true,
                errorMessage: action.payload.ErrorMessage
            }

        case types.GET_ADDRESS:
            return {
                ...state,
                isLoading: true,
                getAddress_success: false,
                getAddress_failure: false,

            }

        case types.GET_ADDRESS_SUCCESS:

            let defaultAddress = {};
            action.payload.ResponseData.forEach(element => {
                if (element.isDefault) {
                    defaultAddress = element
                }
            });

            // defaultAddress = action.payload.ResponseData[0];

            return {
                ...state,
                addressDetailsValue: action.payload.ResponseData,
                isLoading: false,
                getAddress_success: false,
                getAddress_failure: false,
                selectedAddress: defaultAddress
            }

        case types.GET_ADDRESS_FAILURE:
            return {
                ...state,
                isLoading: false,
                getAddress_success: false,
                getAddress_failure: false,
                errorMessage: action.payload.ErrorMessage
            }


        case types.SELECT_ADDRESS:
            return {
                ...state,
                selectedAddress: action.payload.selectedAddress
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
                OrderSummaryItemArray: [],
                totalItem: 0,
                totalPaymentedValue: 0,
                totalSaving: 0,

            }
        case types.PLACE_ORDER_FAILURE:
            return {
                ...state,
                isLoading: false,
                placeOrder_failure: true,
                errorMessage: action.payload.ErrorMessage
            }

        case types.CANCEL_ORDER:
            return {
                ...state,
                isLoadingCancelOrder: true,
                cancelAddress_success: false,
                cancelAddress_failure: false,
                errorMessageCancelOrder: ""
            }
        case types.CANCEL_ORDER_SUCCESS:
            return {
                ...state,
                cancelAddressDetails: action.payload.ResponseData,
                cancelAddress_success: true,
                cancelAddress_failure: false,
                isLoadingCancelOrder: false,
                errorMessageCancelOrder: ""
            }
        case types.CANCEL_ORDER_FAILURE:
            return {
                ...state,
                isLoadingCancelOrder: false,
                cancelAddress_success: false,
                cancelAddress_failure: true,
                errorMessageCancelOrder: action.payload.ErrorMessage
            }

        case types.LOGOUT_USER:

        console.log("logout...!!!")
            return {
                ...state,
                OrderSummaryItemArray: [],
                totalItem: 0,
                totalPaymentedValue: 0,
                totalSaving: 0

            }

        default:
            return state;

    }

}