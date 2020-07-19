import {
    put,
    takeLatest,
    call
} from 'redux-saga/effects';
import APIRequest from '../config/apiCall';
import * as RootNavigation from '../../NavigationComponent/RootNavigation.js';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* registerUserAsync({
    payload
}) {
    // try {
    //     const response = yield call(APIRequest.post, payload);


    //     yield put({
    //         type: 'REGISTER_ASYNC',
    //         payload: {
    //             ResponseData: response.data,
    //         },
    //     });

    //     RootNavigation.navigate('OptVarification');
    // } catch (error) {
    //     console.log('error : ', error);
    // }

    try {

        yield delay(4000)
        const response = yield call(APIRequest.post, payload);

        if (response.status === 200) {

            yield put({
                type: 'REGISTER_USER_SUCCESS',
                payload: {
                    ResponseData: response.data,
                },
            });
            RootNavigation.navigate('OptVarification');


        } else {

            yield put({
                type: 'REGISTER_USER_FAILURE',
                payload: {
                    ResponseData: {},
                    Error: true,
                    ErrorMessage: 'Something went wrong..!!!',
                },
            });
        }

    } catch (error) {
        yield put({
            type: 'REGISTER_USER_FAILURE',
            payload: {
                ResponseData: {},
                Error: true,
                ErrorMessage: 'Something went wrong..!!!',
            },
        });
    }
}

export function* loginUserASYNC({
    payload
}) {
    try {

        yield delay(4000)
        const response = yield call(APIRequest.post, payload);

        if (response.status === 200) {
            if (response.data.errorMessage === 'OB_Success') {
                yield put({
                    type: 'LOGIN_USER_SUCCESS',
                    payload: {
                        ResponseData: response.data,
                    },
                });

                RootNavigation.navigate('Home');

            } else if (response.data.errorMessage === 'OB_InvalidLoginPinCode') {
                yield put({
                    type: 'LOGIN_USER_FAILURE',
                    payload: {
                        ErrorMessage: 'Invaild login Pin Code',
                    },
                });
            } else if (response.data.errorMessage === 'OB_UserIsNotRegistered') {
                yield put({
                    type: 'LOGIN_USER_FAILURE',
                    payload: {
                        ErrorMessage: 'User is not resgister',
                    },
                });
            }
        } else {

            yield put({
                type: 'LOGIN_USER_FAILURE',
                payload: {
                    ResponseData: {},
                    Error: true,
                    ErrorMessage: 'Something went wrong..!!!',
                },
            });
        }

    } catch (error) {
        yield put({
            type: 'LOGIN_USER_FAILURE',
            payload: {
                ResponseData: {},
                Error: true,
                ErrorMessage: 'Something went wrong..!!!',
            },
        });
    }
}

export function* varifyASYNC({
    payload
}) {
    try {

        yield delay(4000)
        const response = yield call(APIRequest.post, payload);

        if (response.status === 200) {
            if (response.data.errorMessage === 'OTP validation is successfull') {
                yield put({
                    type: 'VARIFY_OTP_SUCCESS',
                    payload: {
                        ResponseData: response.data,
                    },
                });

                RootNavigation.navigate('Home');

            } else if (response.data.errorMessage === 'Invalid OTP') {
                yield put({
                    type: 'VARIFY_OTP_FAILURE',
                    payload: {
                        ErrorMessage: 'Invaild OTP',
                    },
                });
            } 
        } else {

            yield put({
                type: 'VARIFY_OTP_FAILURE',
                payload: {
                    ResponseData: {},
                    Error: true,
                    ErrorMessage: 'Something went wrong..!!!',
                },
            });
        }

    } catch (error) {
        yield put({
            type: 'LOGIN_USER_FAILURE',
            payload: {
                ResponseData: {},
                Error: true,
                ErrorMessage: 'Something went wrong..!!!',
            },
        });
    }
}

export function* watchIncrementAsync() {
    yield takeLatest('REGISTER_USER', registerUserAsync);
    yield takeLatest('LOGIN_USER', loginUserASYNC);
    yield takeLatest('VARIFY_OTP', varifyASYNC);

}