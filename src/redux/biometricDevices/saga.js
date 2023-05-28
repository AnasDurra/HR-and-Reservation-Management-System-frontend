import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import AxiosInstance from "../utils/axiosInstance";
import { getDevicesSuccess, getDevicesFailed } from "./reducer";
import { deleteDeviceSuccess, deleteDeviceFailed } from "./reducer";
import { updateDeviceSuccess, updateDeviceFailed } from "./reducer";
import { createDeviceSuccess, createDeviceFailed } from './reducer';

const getDevices = (payload) => {
    return AxiosInstance().get('finger_device', payload);
}

const createDevice = (payload) => {
    return AxiosInstance().post('finger_device', payload);
}

const deleteDevice = (payload) => {
    return AxiosInstance().delete(`finger_device/${payload.id}`, payload);
}

const updateDevice = (payload) => {
    return AxiosInstance().put(`finger_device/${payload.id}`, payload);
}


function* getDevicesSaga({ payload }) {
    try {
        const response = yield call(getDevices, payload);
        yield put(getDevicesSuccess(response.data.data));
    }
    catch (error) {
        yield put(getDevicesFailed(error));
    }
}

function* createDeviceSaga({ payload }) {
    try {
        const response = yield call(createDevice, payload);
        yield put(createDeviceSuccess(response.data.data));
    }
    catch (error) {
        yield put(createDeviceFailed(error));
    }
}

function* deleteDeviceSaga({ payload }) {
    try {
        const response = yield call(deleteDevice, payload);
        yield put(deleteDeviceSuccess(response.data.data));
    }
    catch (error) {
        yield put(deleteDeviceFailed(error));
    }
}

function* updateDeviceSaga({ payload }) {
    try {
        const response = yield call(updateDevice, payload);
        yield put(updateDeviceSuccess(response.data.data));
    }
    catch (error) {
        yield put(updateDeviceFailed(error));
    }
}

function* watchGetDevices() {
    yield takeEvery('biometricDevicesReducer/getDevices', getDevicesSaga);
}

function* watchCreateDevice() {
    yield takeEvery('biometricDevicesReducer/createDevice', createDeviceSaga);
}

function* watchDeleteDevice() {
    yield takeEvery('biometricDevicesReducer/deleteDevice', deleteDeviceSaga);
}

function* watchUpdateDevice() {
    yield takeEvery('biometricDevicesReducer/updateDevice', updateDeviceSaga);
}



function* BiometricDevicesSaga() {
    yield all([
        fork(watchGetDevices),
        fork(watchCreateDevice),
        fork(watchDeleteDevice),
        fork(watchUpdateDevice),
    ]);
}

export default BiometricDevicesSaga;