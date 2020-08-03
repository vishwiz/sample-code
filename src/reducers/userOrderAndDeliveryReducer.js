import * as types from '../actions/types';

const initialState = {
    isLoading: false,
    errorMessage: "",

    pickUpPointListArray: [],
    pickUpPointList_success: false,
    pickUpPointList_failure: false,

    SavePickUpPointList: {},
    pinCodeDetails: {},
    OrderSummaryItemArray: [
        // {
        //     "id": 1,
        //     "maxQuantity": 4,
        //     "name": "Ghadi Pawder 190 grams",
        //     "productImageUrl": "https://elasticbeanstalk-ap-south-1-250191911360.s3.ap-south-1.amazonaws.com/Image/coriander.png",
        //     "unit": "Gm",
        //     "discount": 1,
        //     "quantity": 1,
        //     "mrp": 10,
        //     "sellingPrice": 9,
        //     "totalSelllingPriceWithQuantity": 9,
        //     "totalSavingAmmount": 1
        // }, {
        //     "id": 2,
        //     "maxQuantity": 3,
        //     "name": "Ghadi sadsadas 190 grams",
        //     "productImageUrl": "https://rukminim1.flixcart.com/image/880/1056/k0h12fk0/shoe/m/c/r/372367-10-puma-peacoat-vibrant-orange-white-original-imafk8c4tvpkxadm.jpeg?q=50",
        //     "unit": "Gm",
        //     "discount": 30,
        //     "quantity": 2,
        //     "mrp": 100,
        //     "sellingPrice": 70,
        //     "totalSelllingPriceWithQuantity": 140,
        //     "totalSavingAmmount": 60
        // },
        // {
        //     "id": 3,
        //     "maxQuantity": 4,
        //     "name": "Ghadi Pawder 190 grams",
        //     "productImageUrl": "https://rukminim1.flixcart.com/image/880/1056/k0h12fk0/shoe/m/c/r/372367-10-puma-peacoat-vibrant-orange-white-original-imafk8c4bfdxyqhg.jpeg?q=50",
        //     "unit": "Gm",
        //     "discount": 1,
        //     "quantity": 1,
        //     "mrp": 10,
        //     "sellingPrice": 9,
        //     "totalSelllingPriceWithQuantity": 9,
        //     "totalSavingAmmount": 1
        // },
        // {
        //     "id": 4,
        //     "maxQuantity": 4,
        //     "name": "Ghadi Pawder 190 grams",
        //     "productImageUrl": "https://elasticbeanstalk-ap-south-1-250191911360.s3.ap-south-1.amazonaws.com/Image/coriander.png",
        //     "unit": "Gm",
        //     "discount": 1,
        //     "quantity": 1,
        //     "mrp": 10,
        //     "sellingPrice": 9,
        //     "totalSelllingPriceWithQuantity": 9,
        //     "totalSavingAmmount": 1
        // }, {
        //     "id": 5,
        //     "maxQuantity": 3,
        //     "name": "Ghadi sadsadas 190 grams",
        //     "productImageUrl": "https://rukminim1.flixcart.com/image/880/1056/k0h12fk0/shoe/m/c/r/372367-10-puma-peacoat-vibrant-orange-white-original-imafk8c4tvpkxadm.jpeg?q=50",
        //     "unit": "Gm",
        //     "discount": 30,
        //     "quantity": 2,
        //     "mrp": 100,
        //     "sellingPrice": 70,
        //     "totalSelllingPriceWithQuantity": 140,
        //     "totalSavingAmmount": 60

        // },
        // {
        //     "id": 6,
        //     "maxQuantity": 4,
        //     "name": "Ghadi Pawder 190 grams",
        //     "productImageUrl": "https://rukminim1.flixcart.com/image/880/1056/k0h12fk0/shoe/m/c/r/372367-10-puma-peacoat-vibrant-orange-white-original-imafk8c4bfdxyqhg.jpeg?q=50",
        //     "unit": "Gm",
        //     "discount": 1,
        //     "quantity": 1,
        //     "mrp": 10,
        //     "sellingPrice": 9,
        //     "totalSelllingPriceWithQuantity": 9,
        //     "totalSavingAmmount": 1
        // }, {
        //     "id": 7,
        //     "maxQuantity": 4,
        //     "name": "Ghadi Pawder 190 grams",
        //     "productImageUrl": "https://elasticbeanstalk-ap-south-1-250191911360.s3.ap-south-1.amazonaws.com/Image/coriander.png",
        //     "unit": "Gm",
        //     "discount": 1,
        //     "quantity": 1,
        //     "mrp": 10,
        //     "sellingPrice": 9,
        //     "totalSelllingPriceWithQuantity": 9,
        //     "totalSavingAmmount": 1
        // }, {
        //     "id": 8,
        //     "maxQuantity": 3,
        //     "name": "Ghadi sadsadas 190 grams",
        //     "productImageUrl": "https://rukminim1.flixcart.com/image/880/1056/k0h12fk0/shoe/m/c/r/372367-10-puma-peacoat-vibrant-orange-white-original-imafk8c4tvpkxadm.jpeg?q=50",
        //     "unit": "Gm",
        //     "discount": 30,
        //     "quantity": 2,
        //     "mrp": 100,
        //     "sellingPrice": 70,
        //     "totalSelllingPriceWithQuantity": 140,
        //     "totalSavingAmmount": 60

        // },
        // {
        //     "id": 9,
        //     "maxQuantity": 4,
        //     "name": "Ghadi Pawder 190 grams",
        //     "productImageUrl": "https://rukminim1.flixcart.com/image/880/1056/k0h12fk0/shoe/m/c/r/372367-10-puma-peacoat-vibrant-orange-white-original-imafk8c4bfdxyqhg.jpeg?q=50",
        //     "unit": "Gm",
        //     "discount": 1,
        //     "quantity": 1,
        //     "mrp": 10,
        //     "sellingPrice": 9,
        //     "totalSelllingPriceWithQuantity": 9,
        //     "totalSavingAmmount": 1
        // },
    ],
    totalItem: 0,
    totalPaymentedValue: 0,
    totalSaving: 0,
    addressDetailsValue: []

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
            let value = state.addressDetailsValue;
            value.push(action.payload.addressDetails);
            return {
                ...state,
                addressDetailsValue: value
            }

        default:
            return state;

    }

}