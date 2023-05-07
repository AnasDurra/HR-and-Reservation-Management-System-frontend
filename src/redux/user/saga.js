import {all, fork, takeEvery, call, put} from "redux-saga/effects";
import * as actionTypes from './constants';
import * as actions from './actions';
import AxiosInstance from "../utils/axiosInstance";
import Cookies from "js-cookie";
import * as utils from '../utils/crypto';

const userLogIn = (payload) => {
    return AxiosInstance().post('endPoint', payload);
}


function* userLogInSaga({payload, location, navigate}) {
    try {
        const response = yield call(userLogIn, payload);
        const userJsonToString = JSON.stringify(response.data);
        Cookies.set('user', utils.encrypt(userJsonToString), { expires: 12 });
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
        yield put(actions.userLogInSuccess({
            user: response.data,
        }));
    }
    catch(error) {
        yield put(actions.userLogInFailed({                                                                         
            error: error
        }));
    }
}

function* watchUserLogIn () {
    yield takeEvery(actionTypes.USER_LOG_IN, userLogInSaga);
}

function* UserSaga() {
    yield all([
        fork(watchUserLogIn),
    ]);
}

export default UserSaga;