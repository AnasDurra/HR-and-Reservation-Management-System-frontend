import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import AxiosInstance from "../utils/axiosInstance";
import { getShiftsSuccess, getShiftsFailed, createShiftSuccess, createShiftFailed, getWorkingDaysSucces, getWorkingDaysFailed, updateWorkingDaysSucces, updateWorkingDaysFailed } from "./reducer";
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

const getWorkingDays = (payload) => {
    return AxiosInstance().get('working_days');
}

const updateWorkingDays = (payload) => {
    return AxiosInstance().put(`working_days/${payload.id}`, payload);
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

function* getWorkingDaysSaga({ payload }) {
    try {
        const response = yield call(getWorkingDays, payload);
        yield put(getWorkingDaysSucces(response.data.data));
    }
    catch (error) {
        yield put(getWorkingDaysFailed(error));
    }
}

function* updateWorkingDaysSaga({ payload }) {
    try {
        const response = yield call(updateWorkingDays, payload);
        yield put(updateWorkingDaysSucces(response.data.data));
    }
    catch (error) {
        yield put(updateWorkingDaysFailed(error));
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

function* watchGetWorkingDays() {
    yield takeEvery('shiftsReducer/getWorkingDays', getWorkingDaysSaga);
}

function* watchUpdateWorkingDays() {
    yield takeEvery('shiftsReducer/updateWorkingDays', updateWorkingDaysSaga);
}


function* ShiftsSaga() {
    yield all([
        fork(watchGetShifts),
        fork(watchCreateShift),
        fork(watchDeleteShift),
        fork(watchUpdateShift),
        fork(watchGetWorkingDays),
        fork(watchUpdateWorkingDays),
    ]);
}

export default ShiftsSaga;