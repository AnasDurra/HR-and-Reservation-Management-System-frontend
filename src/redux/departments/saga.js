import {all, fork, takeEvery, call, put} from "redux-saga/effects";
import * as actionTypes from './constants';
import * as actions from './actions';
import AxiosInstance from "../utils/axiosInstance";

const getDepartments = (payload) => {
    return AxiosInstance().get('endPoint', payload);
}

const deleteDepartment = (payload) => {
    return AxiosInstance().delete('endPoint', payload);
}

const updateDepartment = (payload) => {
    return AxiosInstance().put('endPoint', payload);
}

const createDepartment = (payload) => {
    return AxiosInstance().post('endPoint', payload);
}


function* getDepartmentsSaga({payload}) {
    try {
        const response = yield call(getDepartments, payload);
        yield put(actions.getDepartmentsSuccess({
            departments: response.data,
        }));
    }
    catch(error) {
        yield put(actions.getDepartmentsFailed({                                                                         
            error: error
        }));
    }
}

function* deleteDepartmentSaga({payload}) {
    try {
        const response = yield call(deleteDepartment, payload);
        yield put(actions.deleteDepartmentSuccess({
            department: response.data,
        }));
    }
    catch(error) {
        yield put(actions.deleteDepartmentFailed({                                                                         
            error: error
        }));
    }
}

function* updateDepartmentSaga({payload}) {
    try {
        const response = yield call(updateDepartment, payload);
        yield put(actions.updateDepartmentSuccess({
            department: response.data,
        }));
    }
    catch(error) {
        yield put(actions.updateDepartmentFailed({                                                                         
            error: error
        }));
    }
}

function* createDepartmentSaga({payload}) {
    try {
        const response = yield call(createDepartment, payload);
        yield put(actions.createDepartmentSuccess({
            department: response.data,
        }));
    }
    catch(error) {
        yield put(actions.createDepartmentFailed({                                                                         
            error: error
        }));
    }
}

function* watchGetDepartments () {
    yield takeEvery(actionTypes.GET_DEPARTMENTS, getDepartmentsSaga);
}

function* watchDeleteDepartment () {
    yield takeEvery(actionTypes.DELETE_DEPARTMENT, deleteDepartmentSaga);
}

function* watchUpdateDepartment () {
    yield takeEvery(actionTypes.UPDATE_DEPARTMENT, updateDepartmentSaga);
}

function* watchCreateDepartment () {
    yield takeEvery(actionTypes.CREATE_DEPARTMENT, createDepartmentSaga);
}



function* DepartmentsSaga() {
    yield all([
        fork(watchGetDepartments),
        fork(watchDeleteDepartment),
        fork(watchUpdateDepartment),
        fork(watchCreateDepartment),
    ]);
}

export default DepartmentsSaga;