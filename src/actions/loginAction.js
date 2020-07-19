import { REGISTER_USER, RESET, LOGIN_USER, VARIFY_OTP } from './types';

export const registerUser = (payload) => {

    return {
        type: REGISTER_USER,
        payload: payload
    }
}

export const resetUserData = () => {
    return {
        type: RESET
    }
}

export const loginUser = (payload) => {

    return {
        type: LOGIN_USER,
        payload: payload
    }

}

export const varifyOtp = (payload) => {

    return {
        type: VARIFY_OTP,
        payload: payload
    }

}