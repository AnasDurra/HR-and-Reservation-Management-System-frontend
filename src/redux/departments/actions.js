import * as actionTypes from './constants';

export const getDepartments = (payload) => ({
    type: actionTypes.GET_DEPARTMENTS,
    payload: payload,
})

export const getDepartmentsSuccess = (payload) => ({
    type: actionTypes.GET_DEPARTMENTS_SUCCESS,
    payload: payload
})

export const getDepartmentsFailed = (payload) => ({
    type: actionTypes.GET_DEPARTMENTS_FAILED,
    payload: payload
})

export const deleteDepartment = (payload) => ({
    type: actionTypes.DELETE_DEPARTMENT,
    payload: payload,
})

export const deleteDepartmentSuccess = (payload) => ({
    type: actionTypes.DELETE_DEPARTMENT_SUCCESS,
    payload: payload
})

export const deleteDepartmentFailed = (payload) => ({
    type: actionTypes.DELETE_DEPARTMENT_FAILED,
    payload: payload
})