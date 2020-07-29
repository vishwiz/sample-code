import {
    put,
    takeLatest,
    call
} from 'redux-saga/effects';
import APIRequestAxios from '../config/networking';
// import * as RootNavigation from '../../NavigationComponent/RootNavigation.js';


export function* handleProductList({
    payload
}) {
    console.log("post ", payload)
    try {

        const response = yield call(APIRequestAxios.postReq, payload);
        console.log("response.status ", response.status)
        if (response.status === 200) {

            yield put({
                type: 'PRODUCT_LIST_SUCCESS',
                payload: {
                    ResponseData: response.data,
                },
            });
        } else {

            yield put({
                type: 'PRODUCT_LIST_FAILURE',
                payload: {
                    ResponseData: {},
                    Error: true,
                    ErrorMessage: 'Something went wrong..!!!',
                },
            });
        }

    } catch (error) {
        console.log("error 7553", error)
        yield put({
            type: 'PRODUCT_LIST',
            payload: {
                ResponseData: [],
                Error: true,
                ErrorMessage: 'Something went wrong..!!!',
            },
        });
    }
}

export const productListSaga= [
     takeLatest('PRODUCT_LIST', handleProductList)
]