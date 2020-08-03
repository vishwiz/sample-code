import {
    put,
    takeLatest,
    call
} from 'redux-saga/effects';
import APIRequestAxios from '../config/networking';


export function* handleProductList({
    payload
}) {
    try {

        const response = yield call(APIRequestAxios.postReq, payload);
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
        yield put({
            type: 'PRODUCT_LIST_FAILURE',
            payload: {
                ResponseData: [],
                Error: true,
                ErrorMessage: 'Something went wrong..!!!',
            },
        });
    }
}

export function* handleAddToCartList({
    payload
}) {
    try {

        const response = yield call(APIRequestAxios.postReq, payload);
        if (response.status === 200) {

            yield put({
                type: 'ADD_TO_CART_SUCCESS',
                payload: {
                    ResponseData: response.data,
                },
            });
        } else {
            yield put({
                type: 'ADD_TO_CART_FAILURE',
                payload: {
                    ResponseData: {},
                    Error: true,
                    ErrorMessage: 'Something went wrong..!!!',
                },
            });
        }

    } catch (error) {
        yield put({
            type: 'ADD_TO_CART_FAILURE',
            payload: {
                ResponseData: [],
                Error: true,
                ErrorMessage: 'Something went wrong..!!!',
            },
        });
    }
}

export function* handleCarouselData({
    payload
}) {
    try {

        const response = yield call(APIRequestAxios.postReq, payload);
        if (response.status === 200) {

            yield put({
                type: 'CAROUSEl_DATA_SUCCESS',
                payload: {
                    ResponseData: response.data,
                },
            });
        } else {

            yield put({
                type: 'CAROUSEl_DATA_FAILURE',
                payload: {
                    ResponseData: {},
                    Error: true,
                    ErrorMessage: 'Something went wrong..!!!',
                },
            });
        }

    } catch (error) {
        yield put({
            type: 'CAROUSEl_DATA_FAILURE',
            payload: {
                ResponseData: [],
                Error: true,
                ErrorMessage: 'Something went wrong..!!!',
            },
        });
    }
}

export const productListSaga= [
     takeLatest('PRODUCT_LIST', handleProductList),
     takeLatest('ADD_TO_CART', handleAddToCartList),
     takeLatest('CAROUSEl_DATA', handleCarouselData)
]