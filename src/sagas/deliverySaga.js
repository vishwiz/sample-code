import {
    put,
    takeLatest,
    call
} from 'redux-saga/effects';
import APIRequestAxios from '../config/networking';


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

    console.log("payload handlePinCodeCall: ", payload)

    try {
        const response = yield call(APIRequestAxios.getReq, payload);

    console.log("response ", response.data.data[0])


        if (response.status === 200) {

            yield put({
                type: 'PIN_CODE_CALL_SUCCESS',
                payload: {
                    ResponseData: response.data.data[0],
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


export const deliverySaga= [
     takeLatest('PICK_UP_POINT_LIST', handlePickUpPointList),
     takeLatest('PIN_CODE_CALL', handlePinCodeCall),

]