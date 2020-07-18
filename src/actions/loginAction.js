import {REGISTER_USER,RESET} from './types';

export const registerUser = (payload) =>{

    return {
        type : REGISTER_USER,
        payload : payload
    }
}

export const resetUserData = () =>{ 
    return {
        type : RESET
    }
}