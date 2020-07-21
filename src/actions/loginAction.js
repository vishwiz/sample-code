import { REGISTER_USER, RESET, LOGIN_USER, VARIFY_OTP, RESEND_OTP, FORGET_PASSWORD, CHANGE_PASSWORD } from './types';

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

export const resendOtp = (payload) => {

    return {
        type: RESEND_OTP,
        payload: payload
    }

}

export const forgetPassword = (payload) => {

    return {
        type: FORGET_PASSWORD,
        payload: payload
    }

}

export const changePassword = (payload) => {

    return {
        type: CHANGE_PASSWORD,
        payload: payload
    }

}