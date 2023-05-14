import * as actionTypes from './constants';

export const getJobVacancies = (payload) => ({
    type: actionTypes.GET_JOB_VACANCIES,
    payload: payload,
})

export const getJobVacanciesSuccess = (payload) => ({
    type: actionTypes.GET_JOB_VACANCIES_SUCCESS,
    payload: payload
})

export const getJobVacanciesFailed = (payload) => ({
    type: actionTypes.GET_JOB_VACANCIES_FAILED,
    payload: payload
})

export const deleteJobVacancy = (payload) => ({
    type: actionTypes.DELETE_JOB_VACANCY,
    payload: payload,
})

export const deleteJobVacancySuccess = (payload) => ({
    type: actionTypes.DELETE_JOB_VACANCY_SUCCESS,
    payload: payload
})

export const deleteJobVacancyFailed = (payload) => ({
    type: actionTypes.DELETE_JOB_VACANCY_FAILED,
    payload: payload
})

export const updateJobVacancy = (payload) => ({
    type: actionTypes.UPDATE_JOB_VACANCY,
    payload: payload,
})

export const updateJobVacancySuccess = (payload) => ({
    type: actionTypes.UPDATE_JOB_VACANCY_SUCCESS,
    payload: payload
})

export const updateJobVacancyFailed = (payload) => ({
    type: actionTypes.UPDATE_JOB_VACANCY_FAILED,
    payload: payload
})

export const createJobVacancy = (payload) => ({
    type: actionTypes.CREATE_JOB_VACANCY,
    payload: payload,
})

export const createJobVacancySuccess = (payload) => ({
    type: actionTypes.CREATE_JOB_VACANCY_SUCCESS,
    payload: payload
})

export const createJobVacancyFailed = (payload) => ({
    type: actionTypes.CREATE_JOB_VACANCY_FAILED,
    payload: payload
})