import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import AxiosInstance from "../utils/axiosInstance";
import { getCustomersSuccess, getCustomersFailed, getEducationalLevelsSuccess, getEducationalLevelsFailed, verifyAccountSuccess, verifyAccountFailed } from "./reducer";
import { addCustomerSuccess, addCustomerFailed } from "./reducer";
import { deleteCustomerSuccess, deleteCustomerFailed } from "./reducer";
import { updateCustomerSuccess, updateCustomerFailed } from "./reducer";
import { getCustomerSuccess, getCustomerFailed } from "./reducer";
import { cahngeCustomerAccountActiveStateSuccess, cahngeCustomerAccountActiveStateFailed } from "./reducer";
import { getDetectResultSuccess, getDetectResultFailed } from "./reducer";
import { getCustomerAppointmentsStatisticsSuccess, getCustomerAppointmentsStatisticsFailed } from "./reducer";
import { handleError, handleResponse } from '../utils/helpers';


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

    if (payload?.usingApp) {
        params.append('usingApp', payload?.usingApp === 2 ? true : false);
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
    return AxiosInstance().post(`customer-detection`, payload);
}

const verifyAccount = (payload) => {
    return AxiosInstance().post(`customer-verification`, payload);
}

const getCustomerAppointmentsStatistics = (payload) => {
    return AxiosInstance().get(`customer/statistics/${payload.id}`);
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
        } else if (error?.response?.data?.errors?.birth_date) {
            handleError("الرجاء التأكد من تاريخ الميلاد");
        } else if (error?.response?.data?.errors?.national_number) {
            handleError("لقد تم استخدام الرقم الوطني المدخل من قبل");
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
        if (error?.response?.data?.errors?.national_number?.includes(
            "The national number field must be 11 characters.")) {
            handleError("الرجاء ادخال رقم وطني صالح.")
        }
        yield put(getDetectResultFailed(error));
    }
}

function* verifyAccountSaga({ payload }) {
    try {
        const response = yield call(verifyAccount, payload);
        handleResponse("تمّ تم توثيق الحساب بنجاح.")
        yield put(verifyAccountSuccess(response.data.data));
    }
    catch (error) {
        console.log(error);
        if (error?.response?.data?.errors?.national_number?.includes(
            "The national number field must be 11 characters.")) {
            handleError("الرجاء ادخال رقم وطني صالح.");
        } else if (error?.response?.data?.error === "Customer already has verified application account") {
            handleError("لا يمكن توثيق هذا الحساب, المستخدم يملك حساب موثّق");
        }
        yield put(verifyAccountFailed(error));
    }
}

function* getCustomerAppointmentsStatisticsSaga({ payload }) {
    try {
        const response = yield call(getCustomerAppointmentsStatistics, payload);
        yield put(getCustomerAppointmentsStatisticsSuccess(response.data.data));
    }
    catch (error) {
        yield put(getCustomerAppointmentsStatisticsFailed(error));
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

function* watchVerifyAccount() {
    yield takeEvery('customersReducer/verifyAccount', verifyAccountSaga);
}

function* watchGetCustomerAppointmentsStatistics() {
    yield takeEvery('customersReducer/getCustomerAppointmentsStatistics', getCustomerAppointmentsStatisticsSaga);
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
        fork(watchVerifyAccount),
        fork(watchGetCustomerAppointmentsStatistics),
    ]);
}

export default CustomersSaga;