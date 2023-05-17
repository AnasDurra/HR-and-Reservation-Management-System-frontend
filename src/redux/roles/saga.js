import {all, fork, takeEvery, call, put} from "redux-saga/effects";
import * as actionTypes from './constants';
import * as actions from './actions';
import AxiosInstance from "../utils/axiosInstance";

const getRoles = (payload) => {
    return AxiosInstance().get('roles', payload);
}

const getPermissions = (payload) => {
    return AxiosInstance().get('permissions', payload);
}

const deleteRole = (payload) => {
    return AxiosInstance().delete(`roles/${payload.id}`, payload);
}

const updateRole = (payload) => {
    return AxiosInstance().put(`roles/${payload.id}`, payload);
}

const createRole = (payload) => {
    return AxiosInstance().post('roles', payload);
}


function* getRolesSaga({payload}) {
    try {
        const response = yield call(getRoles, payload);
        yield put(actions.getRolesSuccess({
            roles: response.data.data,
        }));
    }
    catch(error) {
        yield put(actions.getRolesFailed({                                                                         
            error: error
        }));
    }
}

function* getPermissionsSaga({payload}) {
    try {
        const response = yield call(getPermissions, payload);
        yield put(actions.getPermissionsSuccess({
            permissions: response.data.data,
        }));
    }
    catch(error) {
        yield put(actions.getPermissionsFailed({                                                                         
            error: error
        }));
    }
}

function* deleteRoleSaga({payload}) {
    try {
        const response = yield call(deleteRole, payload);
        yield put(actions.deleteRoleSuccess({
            role: response.data.data,
        }));
    }
    catch(error) {
        yield put(actions.deleteRoleFailed({                                                                         
            error: error
        }));
    }
}

function* updateRoleSaga({payload}) {
    try {
        const response = yield call(updateRole, payload);
        yield put(actions.updateRoleSuccess({
            role: response.data.data,
        }));
    }
    catch(error) {
        yield put(actions.updateRoleFailed({                                                                         
            error: error
        }));
    }
}

function* createRoleSaga({payload}) {
    try {
        const response = yield call(createRole, payload);
        yield put(actions.createRoleSuccess({
            role: response.data.data,
        }));
    }
    catch(error) {
        yield put(actions.createRoleFailed({                                                                         
            error: error
        }));
    }
}

function* watchGetRoles () {
    yield takeEvery(actionTypes.GET_ROLES, getRolesSaga);
}

function* watchGetPermissions () {
    yield takeEvery(actionTypes.GET_PERMISSIONS, getPermissionsSaga);
}

function* watchDeleteRole () {
    yield takeEvery(actionTypes.DELETE_ROLE, deleteRoleSaga);
}

function* watchUpdateRole () {
    yield takeEvery(actionTypes.UPDATE_ROLE, updateRoleSaga);
}

function* watchCreateRole () {
    yield takeEvery(actionTypes.CREATE_ROLE, createRoleSaga);
}



function* RolesSaga() {
    yield all([
        fork(watchGetRoles),
        fork(watchDeleteRole),
        fork(watchUpdateRole),
        fork(watchCreateRole),
        fork(watchGetPermissions),
    ]);
}

export default RolesSaga;