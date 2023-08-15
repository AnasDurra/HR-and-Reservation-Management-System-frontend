import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import AxiosInstance from "../utils/axiosInstance";
import Cookies from "js-cookie";
import * as utils from '../utils/crypto';
import { loginSuccess, loginFailed, logoutSuccess, logoutFailed, getEmployeePermissionsSuccess, getEmployeePermissionsFailed } from "./reducer";
import { handleError } from "../utils/helpers";

const userLogIn = (payload) => {
    return AxiosInstance().post('login', payload);
}

const userLogOut = () => {
    return AxiosInstance().post('logout');
}

const getEmployeePermissions = () => {
    return AxiosInstance().get('employee');
}


function* userLogInSaga({ payload }) {
    try {
        const response = yield call(userLogIn, payload.values);
        const userJsonToString = JSON.stringify(response.data);
        Cookies.set('user', utils.encrypt(userJsonToString), { expires: 12 });
        const from = payload.location.state?.from?.pathname || "/";
        payload.navigate(from, { replace: true });

        yield put(loginSuccess(response.data));
    }
    catch (error) {
        handleError('تحقق من المعلومات المدخلة');
        yield put(loginFailed(error));
    }
}

function* userLogOutSaga({ payload }) {
    try {
        const response = yield call(userLogOut);
        Cookies.remove('user');
        Cookies.remove('perms');
        payload.navigate('/login', { replace: true });

        yield put(logoutSuccess(response.data));
    }
    catch (error) {
        yield put(logoutFailed(error));
    }
}

function* getEmployeePermissionsSaga({ payload }) {
    try {
        const response = yield call(getEmployeePermissions);
        yield put(getEmployeePermissionsSuccess(response.data.active_permissions));
    }
    catch (error) {
        yield put(getEmployeePermissionsFailed(error));
    }
}

function* watchUserLogIn() {
    yield takeEvery('userReducer/login', userLogInSaga);
}

function* watchUserLogOut() {
    yield takeEvery('userReducer/logout', userLogOutSaga);
}

function* watchGetEmployeePermissions() {
    yield takeEvery('userReducer/getEmployeePermissions', getEmployeePermissionsSaga);
}

function* UserSaga() {
    yield all([
        fork(watchUserLogIn),
        fork(watchUserLogOut),
        fork(watchGetEmployeePermissions),
    ]);
}

export default UserSaga;