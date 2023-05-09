import * as actionTypes from './constants';

export const userLogIn = (payload, location, navigate) => ({
    type: actionTypes.USER_LOG_IN,
    payload: payload,
    location: location,
    navigate: navigate,
})

export const userLogInSuccess = (payload) => ({
    type: actionTypes.USER_LOG_IN_SUCCESS,
    payload: payload
})

export const userLogInFailed = (payload) => ({
    type: actionTypes.USER_LOG_IN_FAILED,
    payload: payload
})