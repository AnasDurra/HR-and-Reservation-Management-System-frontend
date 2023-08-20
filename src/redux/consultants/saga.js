import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import AxiosInstance from "../utils/axiosInstance";
import { getConsultantsSuccess, getConsultantsFailed } from "./reducer";
import { addConsultantSuccess, addConsultantFailed } from "./reducer";
import { deleteConsultantSuccess, deleteConsultantFailed } from "./reducer";
import { updateConsultantSuccess, updateConsultantFailed } from "./reducer";
import { getConsultantSuccess, getConsultantFailed } from "./reducer";
import { getConsultantYearAppointmentsSuccess, getConsultantYearAppointmentsFailed } from "./reducer";
import { getConsultantAllAppointmentsSuccess, getConsultantAllAppointmentsFailed } from "./reducer";
import { handleError } from '../utils/helpers';


const getConsultants = (payload) => {
    const params = new URLSearchParams();

    if (payload?.name) {
        params.append('name', payload.name);
    }

    if (payload?.page) {
        params.append('page', payload.page);
    }

    return AxiosInstance().get(`consultant?${params.toString()}`);
}

const getConsultant = (payload) => {
    return AxiosInstance().get(`consultant/${payload.id}`);
}

const deleteConsultant = (payload) => {
    return AxiosInstance().delete(`consultant/${payload.id}`, payload);
}

const updateConsultant = (payload) => {
    return AxiosInstance().put(`consultant/${payload.id}`, payload);
}

const createConsultant = (payload) => {
    return AxiosInstance().post('consultant', payload);
}

const getConsultantYearAppointments = (payload) => {
    return AxiosInstance().get(`consultant/monthly-statistics/${payload.id}`);
}

const getConsultantAllAppointments = (payload) => {
    return AxiosInstance().get(`consultant/statistics/${payload.id}`);
}


function* getConsultantsSaga({ payload }) {
    try {
        const response = yield call(getConsultants, payload);
        yield put(getConsultantsSuccess(response.data));
    }
    catch (error) {
        yield put(getConsultantsFailed(error));
    }
}

function* getConsultantSaga({ payload }) {
    try {
        const response = yield call(getConsultant, payload);
        yield put(getConsultantSuccess(response.data.data));
    }
    catch (error) {
        yield put(getConsultantFailed(error));
    }
}

function* deleteConsultantSaga({ payload }) {
    try {
        const response = yield call(deleteConsultant, payload);
        yield put(deleteConsultantSuccess(response.data.data));
    }
    catch (error) {
        yield put(deleteConsultantFailed(error));
    }
}

function* updateConsultantSaga({ payload }) {
    try {
        const response = yield call(updateConsultant, payload.data);
        payload.succeed();
        yield put(updateConsultantSuccess(response.data.data));
    }
    catch (error) {
        if (error?.response?.data?.data?.phone_number) {
            handleError("لقد تم استخدام رقم الهاتف المدخل من قبل");
        } else if (error?.response?.data?.data?.email) {
            handleError("لقد تم استخدام البريد الألكتروني المدخل من قبل");
        }
        yield put(updateConsultantFailed(error));
    }
}

function* addConsultantSaga({ payload }) {
    try {
        const response = yield call(createConsultant, payload.data);
        payload.succeed();
        yield put(addConsultantSuccess(response.data.data));
    }
    catch (error) {
        if (error?.response?.data?.data?.phone_number) {
            handleError("لقد تم استخدام رقم الهاتف المدخل من قبل");
        } else if (error?.response?.data?.data?.email) {
            handleError("لقد تم استخدام البريد الألكتروني المدخل من قبل");
        }
        yield put(addConsultantFailed(error));
    }
}

function* getConsultantYearAppointmentsSaga({ payload }) {
    try {
        const response = yield call(getConsultantYearAppointments, payload);
        yield put(getConsultantYearAppointmentsSuccess(response.data.data));
    }
    catch (error) {
        yield put(getConsultantYearAppointmentsFailed(error));
    }
}

function* getConsultantAllAppointmentsSaga({ payload }) {
    try {
        const response = yield call(getConsultantAllAppointments, payload);
        yield put(getConsultantAllAppointmentsSuccess(response.data.data));
    }
    catch (error) {
        yield put(getConsultantAllAppointmentsFailed(error));
    }
}

function* watchGetConsultants() {
    yield takeEvery('consultantsReducer/getConsultants', getConsultantsSaga);
}

function* watchGetConsultant() {
    yield takeEvery('consultantsReducer/getConsultant', getConsultantSaga);
}

function* watchDeleteConsultant() {
    yield takeEvery('consultantsReducer/deleteConsultant', deleteConsultantSaga);
}

function* watchUpdateConsultant() {
    yield takeEvery('consultantsReducer/updateConsultant', updateConsultantSaga);
}

function* watchAddConsultant() {
    yield takeEvery('consultantsReducer/addConsultant', addConsultantSaga);
}

function* watchGetConsultantYearAppointments() {
    yield takeEvery('consultantsReducer/getConsultantYearAppointments', getConsultantYearAppointmentsSaga);
}

function* watchGetConsultantAllAppointments() {
    yield takeEvery('consultantsReducer/getConsultantAllAppointments', getConsultantAllAppointmentsSaga);
}



function* ConsultantsSaga() {
    yield all([
        fork(watchGetConsultants),
        fork(watchGetConsultant),
        fork(watchDeleteConsultant),
        fork(watchUpdateConsultant),
        fork(watchAddConsultant),
        fork(watchGetConsultantYearAppointments),
        fork(watchGetConsultantAllAppointments),
    ]);
}

export default ConsultantsSaga;