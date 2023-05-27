import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import AxiosInstance from "../utils/axiosInstance";
import { getShiftsSuccess, getShiftsFailed, createShiftSuccess, createShiftFailed } from "./reducer";
import { deleteShiftSuccess, deleteShiftFailed } from "./reducer";
import { updateShiftSuccess, updateShiftFailed } from "./reducer";

const getShifts = (payload) => {
    return AxiosInstance().get('schedules', payload);
}

const createShift = (payload) => {
    return AxiosInstance().post('schedules', payload);
}

const deleteShift = (payload) => {
    return AxiosInstance().delete(`schedules/${payload.id}`, payload);
}

const updateShift = (payload) => {
    return AxiosInstance().put(`schedules/${payload.id}`, payload);
}


function* getShiftsSaga({ payload }) {
    try {
        const response = yield call(getShifts, payload);
        yield put(getShiftsSuccess(response.data.data));
    }
    catch (error) {
        yield put(getShiftsFailed(error));
    }
}

function* createShiftSaga({ payload }) {
    try {
        const response = yield call(createShift, payload);
        yield put(createShiftSuccess(response.data.data));
    }
    catch (error) {
        yield put(createShiftFailed(error));
    }
}

function* deleteShiftSaga({ payload }) {
    try {
        const response = yield call(deleteShift, payload);
        yield put(deleteShiftSuccess(response.data.data));
    }
    catch (error) {
        yield put(deleteShiftFailed(error));
    }
}

function* updateShiftSaga({ payload }) {
    try {
        const response = yield call(updateShift, payload);
        yield put(updateShiftSuccess(response.data.data));
    }
    catch (error) {
        yield put(updateShiftFailed(error));
    }
}

function* watchGetShifts() {
    yield takeEvery('shiftsReducer/getShifts', getShiftsSaga);
}

function* watchCreateShift() {
    yield takeEvery('shiftsReducer/createShift', createShiftSaga);
}

function* watchDeleteShift() {
    yield takeEvery('shiftsReducer/deleteShift', deleteShiftSaga);
}

function* watchUpdateShift() {
    yield takeEvery('shiftsReducer/updateShift', updateShiftSaga);
}



function* ShiftsSaga() {
    yield all([
        fork(watchGetShifts),
        fork(watchCreateShift),
        fork(watchDeleteShift),
        fork(watchUpdateShift),
    ]);
}

export default ShiftsSaga;