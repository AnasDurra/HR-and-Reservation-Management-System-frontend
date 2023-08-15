import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import AxiosInstance from "../utils/axiosInstance";
import { getCustomersSuccess, getCustomersFailed, getEducationalLevelsSuccess, getEducationalLevelsFailed } from "./reducer";
import { addCustomerSuccess, addCustomerFailed } from "./reducer";
import { deleteCustomerSuccess, deleteCustomerFailed } from "./reducer";
import { updateCustomerSuccess, updateCustomerFailed } from "./reducer";
import { getCustomerSuccess, getCustomerFailed } from "./reducer";
import { cahngeCustomerAccountActiveStateSuccess, cahngeCustomerAccountActiveStateFailed } from "./reducer";
import { getDetectResultSuccess, getDetectResultFailed } from "./reducer";
import { handleError } from '../utils/helpers';


const getCustomers = (payload) => {
    let url = "customer";

    if (!payload?.type) {
        url = "missed-Appointments-By-Customers";
    }
    const params = new URLSearchParams();

    if (payload?.name) {
        params.append('name', payload.name);
    }

    if (payload?.page) {
        params.append('page', payload.page);
    }

    return AxiosInstance().get(`${url}?${params.toString()}`);
}

const getEducationalLevels = (payload) => {
    return AxiosInstance().get('education_levels');
}

const getCustomer = (payload) => {
    return AxiosInstance().get(`customer/${payload.id}`);
}

const deleteCustomer = (payload) => {
    return AxiosInstance().delete(`customer/${payload.id}`, payload);
}

const updateCustomer = (payload) => {
    return AxiosInstance().post(`customer/${payload.id}`, payload);
}

const createCustomer = (payload) => {
    return AxiosInstance().post('customer/add-by-emp', payload);
}

const customerAccountActivation = (payload) => {
    return AxiosInstance().put(`customer/toggle-status/${payload.id}`, payload);
}

const getDetectResult = (payload) => {
    return AxiosInstance().get(`customer`, payload);
}

function* getCustomersSaga({ payload }) {
    try {
        const response = yield call(getCustomers, payload);
        yield put(getCustomersSuccess(response.data));
    }
    catch (error) {
        yield put(getCustomersFailed(error));
    }
}

function* getEducationaLevelsSaga({ payload }) {
    try {
        const response = yield call(getEducationalLevels, payload);
        console.log(response);
        yield put(getEducationalLevelsSuccess(response.data));
    }
    catch (error) {
        yield put(getEducationalLevelsFailed(error));
    }
}

function* getCustomerSaga({ payload }) {
    try {
        const response = yield call(getCustomer, payload);
        yield put(getCustomerSuccess(response.data.data));
    }
    catch (error) {
        yield put(getCustomerFailed(error));
    }
}

function* deleteCustomerSaga({ payload }) {
    try {
        const response = yield call(deleteCustomer, payload);
        yield put(deleteCustomerSuccess(response.data.data));
    }
    catch (error) {
        yield put(deleteCustomerFailed(error));
    }
}

function* updateCustomerSaga({ payload }) {
    try {
        const response = yield call(updateCustomer, payload.data);
        payload.succeed();
        yield put(updateCustomerSuccess(response.data.data));
    }
    catch (error) {
        if (error?.response?.data?.errors?.email) {
            handleError("لقد تم استخدام البريد الألكتروني المدخل من قبل");
        } else if (error?.response?.data?.errors?.phone_number) {
            handleError("لقد تم استخدام رقم الهاتف الجوال المدخل من قبل");
        }
        yield put(updateCustomerFailed(error));
    }
}

function* addCustomerSaga({ payload }) {
    try {
        const response = yield call(createCustomer, payload.data);
        payload.succeed();
        yield put(addCustomerSuccess(response.data.data));
    }
    catch (error) {
        if (error?.response?.data?.errors?.email) {
            handleError("لقد تم استخدام البريد الألكتروني المدخل من قبل");
        } else if (error?.response?.data?.errors?.phone_number) {
            handleError("لقد تم استخدام رقم الهاتف الجوال المدخل من قبل");
        }
        yield put(addCustomerFailed(error));
    }
}

function* changeCustomerActiveStateSaga({ payload }) {
    try {
        const response = yield call(customerAccountActivation, payload);
        yield put(cahngeCustomerAccountActiveStateSuccess(response.data.data));
    }
    catch (error) {
        yield put(cahngeCustomerAccountActiveStateFailed(error));
    }
}

function* getDetectResultSaga({ payload }) {
    try {
        const response = yield call(getDetectResult, payload);
        yield put(getDetectResultSuccess(response.data.data));
    }
    catch (error) {
        yield put(getDetectResultFailed(error));
    }
}

function* watchGetCustomers() {
    yield takeEvery('customersReducer/getCustomers', getCustomersSaga);
}

function* watchGetEducationalLevels() {
    yield takeEvery('customersReducer/getEducationalLevels', getEducationaLevelsSaga);
}

function* watchGetCustomer() {
    yield takeEvery('customersReducer/getCustomer', getCustomerSaga);
}

function* watchDeleteCustomer() {
    yield takeEvery('customersReducer/deleteCustomer', deleteCustomerSaga);
}

function* watchUpdateCustomer() {
    yield takeEvery('customersReducer/updateCustomer', updateCustomerSaga);
}

function* watchAddCustomer() {
    yield takeEvery('customersReducer/addCustomer', addCustomerSaga);
}

function* watchChangeCustomerActiveState() {
    yield takeEvery('customersReducer/cahngeCustomerAccountActiveState', changeCustomerActiveStateSaga);
}

function* watchGetDetectResult() {
    yield takeEvery('customersReducer/getDetectResult', getDetectResultSaga);
}


function* CustomersSaga() {
    yield all([
        fork(watchGetCustomers),
        fork(watchGetCustomer),
        fork(watchDeleteCustomer),
        fork(watchUpdateCustomer),
        fork(watchAddCustomer),
        fork(watchGetEducationalLevels),
        fork(watchChangeCustomerActiveState),
        fork(watchGetDetectResult),
    ]);
}

export default CustomersSaga;