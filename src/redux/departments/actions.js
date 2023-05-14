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

export const updateDepartment = (payload) => ({
    type: actionTypes.UPDATE_DEPARTMENT,
    payload: payload,
})

export const updateDepartmentSuccess = (payload) => ({
    type: actionTypes.UPDATE_DEPARTMENT_SUCCESS,
    payload: payload
})

export const updateDepartmentFailed = (payload) => ({
    type: actionTypes.UPDATE_DEPARTMENT_FAILED,
    payload: payload
})

export const createDepartment = (payload) => ({
    type: actionTypes.CREATE_DEPARTMENT,
    payload: payload,
})

export const createDepartmentSuccess = (payload) => ({
    type: actionTypes.CREATE_DEPARTMENT_SUCCESS,
    payload: payload
})

export const createDepartmentFailed = (payload) => ({
    type: actionTypes.CREATE_DEPARTMENT_FAILED,
    payload: payload
})