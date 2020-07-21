import {
    REGISTER_USER,
    RESET,
    LOGIN_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    VARIFY_OTP,
    VARIFY_OTP_SUCCESS,
    VARIFY_OTP_FAILURE,
    RESEND_OTP,
    RESEND_OTP_SUCCESS,
    RESEND_OTP_FAILURE,
    FORGET_PASSWORD,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAILURE,
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE
} from '../actions/types';


const initialState = {
    isLoading: "",
    userDetails: {},
    register_success: false,
    register_failure: false,

    loginDetails: {},
    login_success: false,
    login_failure: false,

    otp_success: false,
    otp_failure: false,

    resend_otp_success: false,
    resend_otp_failure: false,

    forget_password_success: false,
    forget_password_failure: false,

    change_password_success: false,
    change_password_failure: false,

    errorMessage: "",
    isLogged: false,
};

export default (state = initialState, action) => {

    switch (action.type) {

        case REGISTER_USER:
            return {
                ...state,
                isLoading: true,
                register_success: false,
                register_failure: false,
                errorMessage: ""
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                userDetails: action.payload.ResponseData,
                isLoading: false,
                register_success: true,

            }
        case REGISTER_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                register_failure: true,
                errorMessage: action.payload.ErrorMessage
            }
        case RESET:
            return {
                state: initialState
            }

        case LOGIN_USER:
            return {
                ...state,
                isLoading: true,
                login_success: false,
                login_failure: false,
                errorMessage: ""
            }

        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                loginDetails: action.payload.ResponseData,
                login_success: true,
                isLoading: false,
                isLogged: true
            }

        case LOGIN_USER_FAILURE:

            return {
                ...state,
                login_failure: true,
                errorMessage: action.payload.ErrorMessage,
                isLoading: false
            }

        case VARIFY_OTP:
            return {
                ...state,
                isLoading: true,
                otp_success: false,
                otp_failure: false,
                errorMessage: ""
            }

        case VARIFY_OTP_SUCCESS:

            if (action.payload.routeData === "Home") {
                return {
                    ...state,
                    loginDetails: action.payload.ResponseData,
                    otp_success: true,
                    isLoading: false,
                    isLogged: true
                }

            } else {
                return {
                    ...state,
                    userDetails: action.payload.ResponseData,
                    otp_success: true,
                    isLoading: false,
                    isLogged: true
                }
            }


        case VARIFY_OTP_FAILURE:

            return {
                ...state,
                otp_failure: true,
                errorMessage: action.payload.ErrorMessage,
                isLoading: false
            }

        case RESEND_OTP:
            return {
                ...state,
                isLoading: true,
                resend_otp_success: false,
                resend_otp_failure: false,
                errorMessage: ""
            }

        case RESEND_OTP_SUCCESS:
            return {
                ...state,
                loginDetails: action.payload.ResponseData,
                resend_otp_success: true,
                isLoading: false,
            }

        case RESEND_OTP_FAILURE:
            return {
                ...state,
                resend_otp_failure: true,
                errorMessage: action.payload.ErrorMessage,
                isLoading: false
            }

        case FORGET_PASSWORD:
            return {
                ...state,
                isLoading: true,
                forget_password_success: false,
                forget_password_failure: false,
                errorMessage: ""
            }

        case FORGET_PASSWORD_SUCCESS:
            return {
                ...state,
                userDetails: action.payload.ResponseData,
                forget_password_success: true,
                isLoading: false,
            }

        case FORGET_PASSWORD_FAILURE:
            return {
                ...state,
                forget_password_failure: true,
                errorMessage: action.payload.ErrorMessage,
                isLoading: false
            }

        case CHANGE_PASSWORD:
            return {
                ...state,
                isLoading: true,
                change_password_success: false,
                change_password_failure: false,
                errorMessage: ""
            }

        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                userDetails: action.payload.ResponseData,
                change_password_success: true,
                isLoading: false,
            }

        case CHANGE_PASSWORD_FAILURE:
            return {
                ...state,
                change_password_failure: true,
                errorMessage: action.payload.ErrorMessage,
                isLoading: false
            }



        default:
            return state;

    }

}