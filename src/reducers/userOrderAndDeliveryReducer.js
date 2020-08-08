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
    selectedAddress: {}

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

        case types.ADD_ADDRESS_SUCCESS:
            let value = state.addressDetailsValue;
            value.push(action.payload.ResponseData.addressDetails);
            return {
                ...state,
                addressDetailsValue: value
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