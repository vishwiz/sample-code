
const initialState = {
    isLoading: true,
    userDetails: {}
};

export default (state = initialState, action) => {

    switch (action.type) {

        case "REGISTER_ASYNC":
            return {
                ...state,
                userDetails: action.data,
                isLoading : false
            }

        case "RESET":
            return {
                ...state,
                userDetails: {}
            }

        default:
            return state;

    }

}