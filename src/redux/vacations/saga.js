import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import AxiosInstance from "../utils/axiosInstance";
import { getAllVacationsSuccess, getAllVacationsFailed } from "./reducer";
import { addVacationSuccess, addVacationFailed } from "./reducer";
import { deleteVacationSuccess, deleteVacationFailed } from "./reducer";
import { addVacationRequestSuccess, addVacationRequestFailed } from "./reducer";
import { getVacationRequestsSuccess, getVacationRequestsFailed } from "./reducer";
import { acceptVacationRequestSuccess, acceptVacationRequestFailed } from "./reducer";
import { rejectVacationRequestSuccess, rejectVacationRequestFailed } from "./reducer";
import { handleError, handleResponse } from "../utils/helpers";

const getAllVacations = (payload) => {
    return AxiosInstance().get(`employees-vacations${payload ? `?page=${payload.page}` : ""}`);
}

const addVacation = (payload) => {
    return AxiosInstance().post('employees-vacations', payload);
}

const deleteVacation = (payload) => {
    return AxiosInstance().delete(`employees-vacations/${payload.id}`);
}

const addVacationRequest = (payload) => {
    return AxiosInstance().post(`vacation-request`, payload);
}

const getVacationRequests = (payload) => {
    const queryParams = new URLSearchParams();
    queryParams.append('req_stat', payload?.req_stat ? payload.req_stat : '');
    queryParams.append('page', payload?.page ? payload.page : '');
    return AxiosInstance().get(`vacation-request?${queryParams.toString()}`);
}

const acceptVacationRequest = (payload) => {
    return AxiosInstance().post(`vacation-request/accept/${payload.id}`);
}

const rejectVacationRequest = (payload) => {
    return AxiosInstance().post(`vacation-request/reject/${payload.id}`);
}

function* getAllVacationsSaga({ payload }) {
    try {
        const response = yield call(getAllVacations, payload);
        yield put(getAllVacationsSuccess(response.data));
    }
    catch (error) {
        yield put(getAllVacationsFailed(error));
    }
}

function* addVacationSaga({ payload }) {
    try {
        const response = yield call(addVacation, payload);
        console.log(response);
        yield put(addVacationSuccess(response.data.data));
    }
    catch (error) {
        if (error?.response?.data?.errors?.start_date) {
            handleError('هذا الموظف يملك إجازة بالفعل');
        }
        yield put(addVacationFailed(error));
    }
}

function* deleteVacationSaga({ payload }) {
    try {
        const response = yield call(deleteVacation, payload);
        yield put(deleteVacationSuccess(response.data.data));
    }
    catch (error) {
        yield put(deleteVacationFailed(error));
    }
}

function* addVacationRequestSaga({ payload }) {
    try {
        const response = yield call(addVacationRequest, payload);
        handleResponse("تم إرسال الطلب بنجاح");
        yield put(addVacationRequestSuccess(response.data.data));
    }
    catch (error) {
        yield put(addVacationRequestFailed(error));
    }
}

function* getVacationRequestsSaga({ payload }) {
    try {
        const response = yield call(getVacationRequests, payload);
        yield put(getVacationRequestsSuccess(response.data));
    }
    catch (error) {
        yield put(getVacationRequestsFailed(error));
    }
}

function* acceptVacationRequestSaga({ payload }) {
    try {
        const response = yield call(acceptVacationRequest, payload);
        yield put(acceptVacationRequestSuccess(response.data.data));
    }
    catch (error) {
        yield put(acceptVacationRequestFailed(error));
    }
}

function* rejectVacationRequestSaga({ payload }) {
    try {
        const response = yield call(rejectVacationRequest, payload);
        yield put(rejectVacationRequestSuccess(response.data.data));
    }
    catch (error) {
        yield put(rejectVacationRequestFailed(error));
    }
}

function* watchGetAllVacations() {
    yield takeEvery('vacationsReducer/getAllVacations', getAllVacationsSaga);
}

function* watchAddVacation() {
    yield takeEvery('vacationsReducer/addVacation', addVacationSaga);
}

function* watchDeleteVacation() {
    yield takeEvery('vacationsReducer/deleteVacation', deleteVacationSaga);
}

function* watchAddVacationRequest() {
    yield takeEvery('vacationsReducer/addVacationRequest', addVacationRequestSaga);
}

function* watchGetVacationRequests() {
    yield takeEvery('vacationsReducer/getVacationRequests', getVacationRequestsSaga);
}

function* watchAcceptVacationRequest() {
    yield takeEvery('vacationsReducer/acceptVacationRequest', acceptVacationRequestSaga);
}

function* watchRejectVacationRequest() {
    yield takeEvery('vacationsReducer/rejectVacationRequest', rejectVacationRequestSaga);
}



function* VacationsSaga() {
    yield all([
        fork(watchGetAllVacations),
        fork(watchAddVacation),
        fork(watchDeleteVacation),
        fork(watchAddVacationRequest),
        fork(watchGetVacationRequests),
        fork(watchAcceptVacationRequest),
        fork(watchRejectVacationRequest),
    ]);
}

export default VacationsSaga;