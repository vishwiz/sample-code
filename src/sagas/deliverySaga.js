import {
    put,
    takeLatest,
    call
} from 'redux-saga/effects';
import APIRequestAxios from '../config/networking';
import * as RootNavigation from '../../NavigationComponent/RootNavigation.js';


export function* handlePickUpPointList({
    payload
}) {
    try {
        const response = yield call(APIRequestAxios.postReq, payload);

        if (response.status === 200) {

            yield put({
                type: 'PICK_UP_POINT_LIST_SUCCESS',
                payload: {
                    ResponseData: response.data,
                },
            });
        } else {

            yield put({
                type: 'PICK_UP_POINT_LIST_FAILURE',
                payload: {
                    ResponseData: {},
                    Error: true,
                    ErrorMessage: 'Something went wrong..!!!',
                },
            });
        }

    } catch (error) {
        yield put({
            type: 'PICK_UP_POINT_LIST_FAILURE',
            payload: {
                ResponseData: [],
                Error: true,
                ErrorMessage: 'Something went wrong..!!!',
            },
        });
    }
}


export function* handlePinCodeCall({
    payload
}) {


    try {
        const response = yield call(APIRequestAxios.getReq, payload);
        if (response.status === 200) {

            yield put({
                type: 'PIN_CODE_CALL_SUCCESS',
                payload: {
                    ResponseData: response.data[0]?.PostOffice[0],
                },
            });
        } else {

            yield put({
                type: 'PIN_CODE_CALL_FAILURE',
                payload: {
                    ResponseData: {},
                    Error: true,
                    ErrorMessage: 'Something went wrong..!!!',
                },
            });
        }

    } catch (error) {
        yield put({
            type: 'PIN_CODE_CALL_FAILURE',
            payload: {
                ResponseData: [],
                Error: true,
                ErrorMessage: 'Something went wrong..!!!',
            },
        });
    }
}


export function* handleAddAdress({
    payload
}) {

    try {
        const response = yield call(APIRequestAxios.postReq, payload);
        if (response.status === 200) {
            yield put({
                type: 'ADD_ADDRESS_SUCCESS',
                payload: {
                    ResponseData: response.data,
                },
            });
            RootNavigation.navigate("AddressBook");

        } else {
            yield put({
                type: 'ADD_ADDRESS_FAILURE',
                payload: {
                    ResponseData: [],
                    Error: true,
                    ErrorMessage: 'Something went wrong..!!!',
                },
            });
        }

    } catch (error) {
        yield put({
            type: 'ADD_ADDRESS_FAILURE',
            payload: {
                ResponseData: [],
                Error: true,
                ErrorMessage: 'Something went wrong..!!!',
            },
        });
    }

}


export function* handleGetAdress({
    payload
}) {

    try {
        const response = yield call(APIRequestAxios.postReq, payload);

        if (response.status === 200) {
            yield put({
                type: 'GET_ADDRESS_SUCCESS',
                payload: {
                    ResponseData: response.data,
                },
            });

        } else {
            
            yield put({
                type: 'GET_ADDRESS_FAILURE',
                payload: {
                    ResponseData: [],
                    Error: true,
                    ErrorMessage: 'Something went wrong..!!!',
                },
            });
        }

    } catch (error) {
        yield put({
            type: 'GET_ADDRESS_FAILURE',
            payload: {
                ResponseData: [],
                Error: true,
                ErrorMessage: 'Something went wrong..!!!',
            },
        });
    }

}

export function* handlePlaceOrder({
    payload
}) {
    try {

        const response = yield call(APIRequestAxios.postReq, payload);
        if (response.status === 200) {

            yield put({
                type: 'PLACE_ORDER_SUCCESS',
                payload: {
                    ResponseData: response.data,
                },
            });
            RootNavigation.navigate('Home',{sucessMessageOrder : "Order palced SucessFully"})
            // Actions.incrementDecrementValue({
            //     data: [],
            //     totalItem: 0,
            //     totalPaymentedValue: 0,
            //     totalSaving: 0,
            // })
        } else {

            yield put({
                type: 'PLACE_ORDER_FAILURE',
                payload: {
                    ResponseData: {},
                    Error: true,
                    ErrorMessage: 'Something went wrong..!!!',
                },
            });
        }

    } catch (error) {
        yield put({
            type: 'PLACE_ORDER_FAILURE',
            payload: {
                ResponseData: [],
                Error: true,
                ErrorMessage: 'Something went wrong..!!!',
            },
        });
    }
}

export function* handleCancelOrder({
    payload
}) {
    try {

        const response = yield call(APIRequestAxios.postReq, payload);
        if (response.status === 200) {

            yield put({
                type: 'CANCEL_ORDER_SUCCESS',
                payload: {
                    ResponseData: response.data,
                },
            });
        } else {

            yield put({
                type: 'CANCEL_ORDER_FAILURE',
                payload: {
                ResponseData: {},
                    Error: true,
                    ErrorMessage: 'Something went wrong..!!!',
                },
            });
        }

    } catch (error) {
        yield put({
            type: 'CANCEL_ORDER_FAILURE',
            payload: {
                ResponseData: {},
                Error: true,
                ErrorMessage: 'Something went wrong..!!!',
            },
        });
    }
}


export const deliverySaga = [
    takeLatest('PICK_UP_POINT_LIST', handlePickUpPointList),
    takeLatest('PIN_CODE_CALL', handlePinCodeCall),
    takeLatest('ADD_ADDRESS', handleAddAdress),
    takeLatest('GET_ADDRESS', handleGetAdress),
    takeLatest('PLACE_ORDER', handlePlaceOrder),
    takeLatest('CANCEL_ORDER', handleCancelOrder)


]