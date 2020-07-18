const initialState = {
    isLoading: false,
    moviesDetails: ""
};

export default (state = initialState, action) => {

    switch (action.type) {

        case "INCREMENT_ASYNC":
            return {
                ...state,
                moviesDetails: action.products
            }

        case "DECREMENT_ASYNC":
            return state;

        default:
            return state;

    }

}