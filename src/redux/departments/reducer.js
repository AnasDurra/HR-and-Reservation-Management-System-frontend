import * as actionTypes from './constants';

const initialState = {
    departments: [],
    loading: false,
    error: null,
}

const departmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_DEPARTMENTS:
            return { ...state, loading: true, error: null };
        case actionTypes.GET_DEPARTMENTS_SUCCESS:
            return { ...state, loading: false, departments: action.payload.departments };
        case actionTypes.GET_DEPARTMENTS_FAILED:
            return { ...state, loading: false, error: action.payload.error };

        case actionTypes.DELETE_DEPARTMENT:
            return { ...state, loading: true, error: null };
        case actionTypes.DELETE_DEPARTMENT_SUCCESS:
        // return { ...state, loading: false, departments: action.payload.departments };
        case actionTypes.DELETE_DEPARTMENT_FAILED:
            return { ...state, loading: false, error: action.payload.error };

        case actionTypes.UPDATE_DEPARTMENT:
            return { ...state, loading: true, error: null };
        case actionTypes.UPDATE_DEPARTMENT_SUCCESS:
        // return { ...state, loading: false, departments: action.payload.departments };
        case actionTypes.UPDATE_DEPARTMENT_FAILED:
            return { ...state, loading: false, error: action.payload.error };

        case actionTypes.CREATE_DEPARTMENT:
            return { ...state, loading: true, error: null };
        case actionTypes.CREATE_DEPARTMENT_SUCCESS:
        // return { ...state, loading: false, departments: action.payload.departments };
        case actionTypes.CREATE_DEPARTMENT_FAILED:
            return { ...state, loading: false, error: action.payload.error };

        default:
            return state;
    }
}

export default departmentsReducer;