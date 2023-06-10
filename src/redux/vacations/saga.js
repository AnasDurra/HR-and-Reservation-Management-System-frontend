import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import AxiosInstance from "../utils/axiosInstance";
import { getAllVacationsSuccess, getAllVacationsFailed } from "./reducer";

const getAllVacations = (payload) => {
    return AxiosInstance().get(`employees-vacations${payload ? `?page=${payload}` : ""}`);
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

function* watchGetAllVacations() {
    yield takeEvery('vacationsReducer/getAllVacations', getAllVacationsSaga);
}



function* VacationsSaga() {
    yield all([
        fork(watchGetAllVacations),
    ]);
}

export default VacationsSaga;