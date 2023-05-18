import * as actionTypes from './constants';

export const getRoles = (payload) => ({
    type: actionTypes.GET_ROLES,
    payload: payload,
})

export const getRolesSuccess = (payload) => ({
    type: actionTypes.GET_ROLES_SUCCESS,
    payload: payload
})

export const getRolesFailed = (payload) => ({
    type: actionTypes.GET_ROLES_FAILED,
    payload: payload
})

export const getPermissions = (payload) => ({
    type: actionTypes.GET_PERMISSIONS,
    payload: payload,
})

export const getPermissionsSuccess = (payload) => ({
    type: actionTypes.GET_PERMISSIONS_SUCCESS,
    payload: payload
})

export const getPermissionsFailed = (payload) => ({
    type: actionTypes.GET_PERMISSIONS_FAILED,
    payload: payload
})

export const deleteRole = (payload) => ({
    type: actionTypes.DELETE_ROLE,
    payload: payload,
})

export const deleteRoleSuccess = (payload) => ({
    type: actionTypes.DELETE_ROLE_SUCCESS,
    payload: payload
})

export const deleteRoleFailed = (payload) => ({
    type: actionTypes.DELETE_ROLE_FAILED,
    payload: payload
})

export const updateRole = (payload) => ({
    type: actionTypes.UPDATE_ROLE,
    payload: payload,
})

export const updateRoleSuccess = (payload) => ({
    type: actionTypes.UPDATE_ROLE_SUCCESS,
    payload: payload
})

export const updateRoleFailed = (payload) => ({
    type: actionTypes.UPDATE_ROLE_FAILED,
    payload: payload
})

export const createRole = (payload) => ({
    type: actionTypes.CREATE_ROLE,
    payload: payload,
})

export const createRoleSuccess = (payload) => ({
    type: actionTypes.CREATE_ROLE_SUCCESS,
    payload: payload
})

export const createRoleFailed = (payload) => ({
    type: actionTypes.CREATE_ROLE_FAILED,
    payload: payload
})