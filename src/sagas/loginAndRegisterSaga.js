import {
    put,
    takeLatest,
    call
} from 'redux-saga/effects';
import APIRequest from '../config/apiCall';
import APIRequestAxios from '../config/networking';
import * as RootNavigation from '../../NavigationComponent/RootNavigation.js';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* registerUserAsync({
    payload
}) {
    try {

        const response = yield call(APIRequestAxios.postReq,payload);
        if (response.status === 200) {

            yield put({
                type: 'REGISTER_USER_SUCCESS',
                payload: {
                    ResponseData: response.data,
                },
            });
            RootNavigation.navigate('OptVarification', { directionTo: "Home" });


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

        const response = yield call(APIRequestAxios.postReq, payload);

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

export function* varifyOTPASYNC({
    payload
}) {
    try {

        const response = yield call(APIRequestAxios.postReq, payload);

        if (response.status === 200) {
            if (response.data.errorMessage === 'OTP validation is successfull') {
                yield put({
                    type: 'VARIFY_OTP_SUCCESS',
                    payload: {
                        ResponseData: response.data,
                        routeData: payload.routeData
                    },
                });

                RootNavigation.navigate(payload.routeData);

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
            type: 'VARIFY_OTP_FAILURE',
            payload: {
                ResponseData: {},
                Error: true,
                ErrorMessage: 'Something went wrong..!!!',
            },
        });
    }
}


export function* resendOTPASYNC({
    payload
}) {
    try {

        yield delay(5000)


        const response = yield call(APIRequestAxios.postReq, payload);

        if (response.status === 200) {
            if (response.data.errorMessage === "Otp sent to your mobile no") {
                yield put({
                    type: 'RESEND_OTP_SUCCESS',
                    payload: {
                        ResponseData: response.data,
                    },
                });

            } else {
                yield put({
                    type: 'RESEND_OTP_FAILURE',
                    payload: {
                        ErrorMessage: 'Not able to send OTP',
                    },
                });
            }
        } else {

            yield put({
                type: 'RESEND_OTP_FAILURE',
                payload: {
                    ResponseData: {},
                    Error: true,
                    ErrorMessage: 'Something went wrong..!!!',
                },
            });
        }

    } catch (error) {
        yield put({
            type: 'RESEND_OTP_FAILURE',
            payload: {
                ResponseData: {},
                Error: true,
                ErrorMessage: 'Something went wrong..!!!',
            },
        });
    }
}



export function* forgetPasswordASYNC({
    payload
}) {
    try {

        yield delay(5000)


        const response = yield call(APIRequestAxios.postReq, payload);


        if (response.status === 200) {
            if (response.data.errorMessage === "Otp sent to your mobile no") {

                yield put({
                    type: 'FORGET_PASSWORD_SUCCESS',
                    payload: {
                        ResponseData: response.data,
                    },
                });

                RootNavigation.navigate('OptVarification', { directionTo: "ChangePassword" });

            } else {
                yield put({
                    type: 'FORGET_PASSWORD_FAILURE',
                    payload: {
                        ErrorMessage: 'Reset Password error',
                    },
                });
            }
        } else {

            yield put({
                type: 'FORGET_PASSWORD_FAILURE',
                payload: {
                    ResponseData: {},
                    Error: true,
                    ErrorMessage: 'Something went wrong..!!!',
                },
            });
        }

    } catch (error) {
        yield put({
            type: 'FORGET_PASSWORD_FAILURE',
            payload: {
                ResponseData: {},
                Error: true,
                ErrorMessage: 'Something went wrong..!!!',
            },
        });
    }
}


export function* changePasswordASYNC({
    payload
}) {
    try {

        yield delay(5000)


        const response = yield call(APIRequestAxios.postReq, payload);


        if (response.status === 200) {
            if (response.data.errorMessage === "OB_Success_Change_Password") {

                yield put({
                    type: 'CHANGE_PASSWORD_SUCCESS',
                    payload: {
                        ResponseData: response.data,
                    },
                });

                RootNavigation.navigate('Login')

            } else {
                yield put({
                    type: 'CHANGE_PASSWORD_FAILURE',
                    payload: {
                        ErrorMessage: 'Change Password failed..!!!',
                    },
                });
            }
        } else {

            yield put({
                type: 'CHANGE_PASSWORD_FAILURE',
                payload: {
                    ResponseData: {},
                    Error: true,
                    ErrorMessage: 'Something went wrong..!!!',
                },
            });
        }

    } catch (error) {
        yield put({
            type: 'CHANGE_PASSWORD_FAILURE',
            payload: {
                ResponseData: {},
                Error: true,
                ErrorMessage: 'Something went wrong..!!!',
            },
        });
    }
}



export const loginAndRegisterSaga = [
    takeLatest('REGISTER_USER', registerUserAsync),
    takeLatest('LOGIN_USER', loginUserASYNC),
    takeLatest('VARIFY_OTP', varifyOTPASYNC),
    takeLatest('RESEND_OTP', resendOTPASYNC),
    takeLatest('FORGET_PASSWORD', forgetPasswordASYNC),
    takeLatest('CHANGE_PASSWORD', changePasswordASYNC)
]