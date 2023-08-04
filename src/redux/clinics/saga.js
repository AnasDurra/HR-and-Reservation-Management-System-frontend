import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import AxiosInstance from "../utils/axiosInstance";
import { getClinicsSuccess, getClinicsFailed } from "./reducer";
import { handleError } from '../utils/helpers';


const getClinics = (payload) => {
    return AxiosInstance().get('clinic');
}

function* getClinicsSaga({ payload }) {
    try {
        const response = yield call(getClinics, payload);
        yield put(getClinicsSuccess(response.data));
    }
    catch (error) {
        yield put(getClinicsFailed(error));
    }
}

function* watchGetClinics() {
    yield takeEvery('clinicsReducer/getClinics', getClinicsSaga);
}

function* ClinicsSaga() {
    yield all([
        fork(watchGetClinics),
    ]);
}

export default ClinicsSaga;