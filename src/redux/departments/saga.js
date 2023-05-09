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

function* watchGetDepartments () {
    yield takeEvery(actionTypes.GET_DEPARTMENTS, getDepartmentsSaga);
}

function* watchDeleteDepartment () {
    yield takeEvery(actionTypes.DELETE_DEPARTMENT, deleteDepartmentSaga);
}

function* DepartmentsSaga() {
    yield all([
        fork(watchGetDepartments),
        fork(watchDeleteDepartment),
    ]);
}

export default DepartmentsSaga;