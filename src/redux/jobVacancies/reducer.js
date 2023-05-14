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
            const jobVacanciesAfterDelete = state.jobVacancies.filter((job) => job.job_id !== action.payload.jobVacancy.job_id);
            return { ...state, loading: false, jobVacancies: jobVacanciesAfterDelete };
        case actionTypes.DELETE_JOB_VACANCY_FAILED:
            return { ...state, loading: false, error: action.payload.error };

        case actionTypes.UPDATE_JOB_VACANCY:
            return { ...state, loading: true, error: null };
        case actionTypes.UPDATE_JOB_VACANCY_SUCCESS:
            const jobVacanciesAfterUpdate = state.jobVacancies.map((job) => job.job_id !== action.payload.jobVacancy.job_id ? job : action.payload.jobVacancy);
            return { ...state, loading: false, jobVacancies: jobVacanciesAfterUpdate };
        case actionTypes.UPDATE_JOB_VACANCY_FAILED:
            return { ...state, loading: false, error: action.payload.error };

        case actionTypes.CREATE_JOB_VACANCY:
            return { ...state, loading: true, error: null };
        case actionTypes.CREATE_JOB_VACANCY_SUCCESS:
            const jobVacanciesAfterCreate = state.jobVacancies.concat(action.payload.jobVacancy);
            return { ...state, loading: false, jobVacancies: jobVacanciesAfterCreate };
        case actionTypes.CREATE_JOB_VACANCY_FAILED:
            return { ...state, loading: false, error: action.payload.error };

        default:
            return state;
    }
}

export default jobVacanciesReducer;