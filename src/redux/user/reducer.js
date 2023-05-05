import * as actionTypes from './constants';

const initialState = {
    user: null,
    loading: false,
    error: null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOG_IN:
            return { ...state, loading: true, error: null };
        case actionTypes.USER_LOG_IN_SUCCESS:
            return { ...state, loading: false, user: action.payload.user };
        case actionTypes.USER_LOG_IN_FAILED:
            return { ...state, loading: false, error: action.payload.error };

        default:
            return state;
    }
}

export default userReducer;