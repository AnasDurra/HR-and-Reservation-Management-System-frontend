import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import AxiosInstance from "../utils/axiosInstance";
import { addTimeShiftRequestSuccess, addTimeShiftRequestFailed } from "./reducer";
import { getTimeShiftRequestsSuccess, getTimeShiftRequestsFailed } from "./reducer";
import { acceptTimeShiftRequestSuccess, acceptTimeShiftRequestFailed } from "./reducer";
import { rejectTimeShiftRequestSuccess, rejectTimeShiftRequestFailed } from "./reducer";
import { handleError, handleResponse } from "../utils/helpers";

const addTimeShiftRequest = (payload) => {
    return AxiosInstance().post(`shift-request`, payload);
}

const getTimeShiftRequests = (payload) => {
    return AxiosInstance().get(`shift-request${payload ? `?page=${payload.page}` : ""}`);
}

const acceptTimeShiftRequest = (payload) => {
    return AxiosInstance().post(`shift-request/accept/${payload.id}`);
}

const rejectTimeShiftRequest = (payload) => {
    return AxiosInstance().post(`shift-request/reject/${payload.id}`);
}

function* addTimeShiftRequestSaga({ payload }) {
    try {
        const response = yield call(addTimeShiftRequest, payload);
        handleResponse("تم إرسال الطلب بنجاح");
        yield put(addTimeShiftRequestSuccess(response.data.data));
    }
    catch (error) {
        yield put(addTimeShiftRequestFailed(error));
    }
}

function* getTimeShiftRequestsSaga({ payload }) {
    try {
        const response = yield call(getTimeShiftRequests, payload);
        yield put(getTimeShiftRequestsSuccess(response.data));
    }
    catch (error) {
        yield put(getTimeShiftRequestsFailed(error));
    }
}

function* acceptTimeShiftRequestSaga({ payload }) {
    try {
        const response = yield call(acceptTimeShiftRequest, payload);
        yield put(acceptTimeShiftRequestSuccess(response.data.data));
    }
    catch (error) {
        yield put(acceptTimeShiftRequestFailed(error));
    }
}

function* rejectTimeShiftRequestSaga({ payload }) {
    try {
        const response = yield call(rejectTimeShiftRequest, payload);
        yield put(rejectTimeShiftRequestSuccess(response.data.data));
    }
    catch (error) {
        yield put(rejectTimeShiftRequestFailed(error));
    }
}


function* watchAddTimeShiftRequest() {
    yield takeEvery('timeShiftsReducer/addTimeShiftRequest', addTimeShiftRequestSaga);
}

function* watchGetTimeShiftRequests() {
    yield takeEvery('timeShiftsReducer/getTimeShiftRequests', getTimeShiftRequestsSaga);
}

function* watchAcceptTimeShiftRequest() {
    yield takeEvery('timeShiftsReducer/acceptTimeShiftRequest', acceptTimeShiftRequestSaga);
}

function* watchRejectTimeShiftRequest() {
    yield takeEvery('timeShiftsReducer/rejectTimeShiftRequest', rejectTimeShiftRequestSaga);
}



function* TimeShiftsSaga() {
    yield all([
        fork(watchAddTimeShiftRequest),
        fork(watchGetTimeShiftRequests),
        fork(watchAcceptTimeShiftRequest),
        fork(watchRejectTimeShiftRequest),
    ]);
}

export default TimeShiftsSaga;