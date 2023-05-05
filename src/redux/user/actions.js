import * as actionTypes from './constants';

export const userLogIn = (payload) => ({
    type: actionTypes.USER_LOG_IN,
    payload: payload
})

export const userLogInSuccess = (payload) => ({
    type: actionTypes.USER_LOG_IN_SUCCESS,
    payload: payload
})

export const userLogInFailed = (payload) => ({
    type: actionTypes.USER_LOG_IN_FAILED,
    payload: payload
})