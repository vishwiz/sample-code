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
    VARIFY_OTP_FAILURE
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
            return {
                ...state,
                loginDetails: action.payload.ResponseData,
                otp_success: true,
                isLoading: false,
                isLogged: true
            }

        case VARIFY_OTP_FAILURE:

            return {
                ...state,
                otp_failure: true,
                errorMessage: action.payload.ErrorMessage,
                isLoading: false
            }



        default:
            return state;

    }

}