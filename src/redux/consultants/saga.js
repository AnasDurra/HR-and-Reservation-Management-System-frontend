import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import AxiosInstance from "../utils/axiosInstance";
import { getConsultantsSuccess, getConsultantsFailed } from "./reducer";
import { addConsultantSuccess, addConsultantFailed } from "./reducer";
import { deleteConsultantSuccess, deleteConsultantFailed } from "./reducer";
import { updateConsultantSuccess, updateConsultantFailed } from "./reducer";
import { getConsultantSuccess, getConsultantFailed } from "./reducer";
import { handleError } from '../utils/helpers';


const getConsultants = (payload) => {
    const params = new URLSearchParams();

    if (payload?.name) {
        params.append('name', payload.name);
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
        console.log(payload);
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



function* ConsultantsSaga() {
    yield all([
        fork(watchGetConsultants),
        fork(watchGetConsultant),
        fork(watchDeleteConsultant),
        fork(watchUpdateConsultant),
        fork(watchAddConsultant),
    ]);
}

export default ConsultantsSaga;