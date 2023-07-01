import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import AxiosInstance from "../utils/axiosInstance";
import { getTimeSheetLogSuccess, getTimeSheetLogFailed } from "./reducer";
import { addAttendanceRecordSuccess, addAttendanceRecordFailed } from "./reducer";
import { addLeaveRecordSuccess, addLeaveRecordFailed } from "./reducer";
import { handleError } from "../utils/helpers";


const getTimeSheetLog = (payload) => {
    const params = new URLSearchParams();

    if (payload?.page) {
        params.append('page', payload.page);
    }

    if (payload?.name) {
        params.append('name', payload.name);
    }
    return AxiosInstance().get(`attendance?${params.toString()}`);
}

const addAttendanceRecord = (payload) => {
    return AxiosInstance().post('attendance', payload);
}

const addLeaveRecord = (payload) => {
    return AxiosInstance().post('leave', payload);
}


function* getTimeSheetLogSaga({ payload }) {
    try {
        const response = yield call(getTimeSheetLog, payload);
        yield put(getTimeSheetLogSuccess(response.data.data));
    }
    catch (error) {
        yield put(getTimeSheetLogFailed(error));
    }
}

function* addAttendanceRecordSaga({ payload }) {
    try {
        const response = yield call(addAttendanceRecord, payload);
        yield put(addAttendanceRecordSuccess(response.data.data));
    }
    catch (error) {
        if (error?.response?.data?.message === "Employee has already checked-in in this day") {
            handleError('لقد تم تسجيل دخول هذا الموظف في هذا اليوم سابقا', error);
        }
        yield put(addAttendanceRecordFailed(error));
    }
}

function* addLeaveRecordSaga({ payload }) {
    try {
        const response = yield call(addLeaveRecord, payload);
        yield put(addLeaveRecordSuccess(response.data.data));
    }
    catch (error) {
        if (error?.response?.data?.message === "Employee has not checked-in in this day") {
            handleError('هذا الموظف لم يقم بتسجيل الدخول في هذا اليوم', error);
        }
        if (error?.response?.data?.message === "Employee has already checked-out in this day") {
            handleError('لقد تم تسجيل مغادرة هذا الموظف في هذا اليوم سابقا', error);
        }
        yield put(addLeaveRecordFailed(error));
    }
}

function* watchGetTimeSheetLog() {
    yield takeEvery('timeSheetReducer/getTimeSheetLog', getTimeSheetLogSaga);
}

function* watchAddAttendanceRecord() {
    yield takeEvery('timeSheetReducer/addAttendanceRecord', addAttendanceRecordSaga);
}

function* watchAddLeaveRecord() {
    yield takeEvery('timeSheetReducer/addLeaveRecord', addLeaveRecordSaga);
}


function* TimeSheetSaga() {
    yield all([
        fork(watchGetTimeSheetLog),
        fork(watchAddAttendanceRecord),
        fork(watchAddLeaveRecord),
    ]);
}

export default TimeSheetSaga;