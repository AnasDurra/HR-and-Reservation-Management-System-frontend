import * as actionTypes from './constants';

const initialState = {
    jobVacancies: [],
    loading: false,
    error: null,
}

const jobVacanciesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_JOB_VACANCIES:
            return { ...state, loading: true, error: null };
        case actionTypes.GET_JOB_VACANCIES_SUCCESS:
            return { ...state, loading: false, jobVacancies: action.payload.departments };
        case actionTypes.GET_JOB_VACANCIES_FAILED:
            return { ...state, loading: false, error: action.payload.error };

        case actionTypes.DELETE_JOB_VACANCY:
            return { ...state, loading: true, error: null };
        case actionTypes.DELETE_JOB_VACANCY_SUCCESS:
        // return { ...state, loading: false, jobVacancies: action.payload.departments };
        case actionTypes.DELETE_JOB_VACANCY_FAILED:
            return { ...state, loading: false, error: action.payload.error };

        case actionTypes.UPDATE_JOB_VACANCY:
            return { ...state, loading: true, error: null };
        case actionTypes.UPDATE_JOB_VACANCY_SUCCESS:
        // return { ...state, loading: false, jobVacancies: action.payload.departments };
        case actionTypes.UPDATE_JOB_VACANCY_FAILED:
            return { ...state, loading: false, error: action.payload.error };

        case actionTypes.CREATE_JOB_VACANCY:
            return { ...state, loading: true, error: null };
        case actionTypes.CREATE_JOB_VACANCY_SUCCESS:
        // return { ...state, loading: false, jobVacancies: action.payload.departments };
        case actionTypes.CREATE_JOB_VACANCY_FAILED:
            return { ...state, loading: false, error: action.payload.error };

        default:
            return state;
    }
}

export default jobVacanciesReducer;