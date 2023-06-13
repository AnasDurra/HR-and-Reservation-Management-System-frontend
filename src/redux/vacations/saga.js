import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import AxiosInstance from "../utils/axiosInstance";
import { getAllVacationsSuccess, getAllVacationsFailed } from "./reducer";
import { addVacationSuccess, addVacationFailed } from "./reducer";
import { deleteVacationSuccess, deleteVacationFailed } from "./reducer";
import { addVacationRequestSuccess, addVacationRequestFailed } from "./reducer";
import { handleError } from "../utils/helpers";

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
        yield put(addVacationRequestSuccess(response.data.data));
    }
    catch (error) {
        yield put(addVacationRequestFailed(error));
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



function* VacationsSaga() {
    yield all([
        fork(watchGetAllVacations),
        fork(watchAddVacation),
        fork(watchDeleteVacation),
        fork(watchAddVacationRequest),
    ]);
}

export default VacationsSaga;