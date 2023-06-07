import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import AxiosInstance from "../utils/axiosInstance";
import { getHolidaysSuccess, getHolidaysFailed } from "./reducer";
import { addHolidaySuccess, addHolidayFailed } from "./reducer";
import { deleteHolidaySuccess, deleteHolidayFailed } from "./reducer";
import { updateHolidaySuccess, updateHolidayFailed } from "./reducer";

const getHolidays = (payload) => {
    return AxiosInstance().get('holidays');
}

const addHoliday = (payload) => {
    return AxiosInstance().post('holidays', payload);
}

const deleteHoliday = (payload) => {
    return AxiosInstance().delete(`holidays/${payload.id}`);
}

const updateHoliday = (payload) => {
    return AxiosInstance().put(`holidays/${payload.id}`, payload);
}

function* getHolidaysSaga({ payload }) {
    try {
        const response = yield call(getHolidays, payload);
        yield put(getHolidaysSuccess(response.data.data));
    }
    catch (error) {
        yield put(getHolidaysFailed(error));
    }
}

function* addHolidaySaga({ payload }) {
    try {
        const response = yield call(addHoliday, payload);
        yield put(addHolidaySuccess(response.data.data));
    }
    catch (error) {
        yield put(addHolidayFailed(error));
    }
}

function* deleteHolidaySaga({ payload }) {
    try {
        const response = yield call(deleteHoliday, payload);
        yield put(deleteHolidaySuccess(response.data.data));
    }
    catch (error) {
        yield put(deleteHolidayFailed(error));
    }
}

function* updateHolidaySaga({ payload }) {
    try {
        const response = yield call(updateHoliday, payload);
        yield put(updateHolidaySuccess(response.data.data));
    }
    catch (error) {
        yield put(updateHolidayFailed(error));
    }
}

function* watchGetHolidays() {
    yield takeEvery('holidaysReducer/getHolidays', getHolidaysSaga);
}

function* watchAddHoliday() {
    yield takeEvery('holidaysReducer/addHoliday', addHolidaySaga);
}

function* watchDeleteHoliday() {
    yield takeEvery('holidaysReducer/deleteHoliday', deleteHolidaySaga);
}

function* watchUpdateHoliday() {
    yield takeEvery('holidaysReducer/updateHoliday', updateHolidaySaga);
}


function* HolidaysSaga() {
    yield all([
        fork(watchGetHolidays),
        fork(watchAddHoliday),
        fork(watchDeleteHoliday),
        fork(watchUpdateHoliday),
    ]);
}

export default HolidaysSaga;