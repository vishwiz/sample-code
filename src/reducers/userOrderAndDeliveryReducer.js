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

        default:
            return state;

    }

}