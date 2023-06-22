import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import AxiosInstance from "../utils/axiosInstance";
import { getEmployeesAbsencesSuccess, getEmployeesAbsencesFailed } from "./reducer";
import { updateEmployeeAbsenceStatusSuccess, updateEmployeeAbsenceStatusFailed } from "./reducer";

const getEmployeesAbsences = (payload) => {
    return AxiosInstance().get(`absences${payload ? `?page=${payload.page}` : ""}`);
}

const updateEmployeeAbsenceStatus = (payload) => {
    return AxiosInstance().put(`absences/${payload.id}?status=${payload.status}`);
}

function* getEmployeesAbsencesSaga({ payload }) {
    try {
        const response = yield call(getEmployeesAbsences, payload);
        yield put(getEmployeesAbsencesSuccess(response.data));
    }
    catch (error) {
        yield put(getEmployeesAbsencesFailed(error));
    }
}

function* updateEmployeeAbsenceSaga({ payload }) {
    try {
        const response = yield call(updateEmployeeAbsenceStatus, payload);
        yield put(updateEmployeeAbsenceStatusSuccess(response.data.data));
    }
    catch (error) {
        yield put(updateEmployeeAbsenceStatusFailed(error));
    }
}


function* watchGetEmployeesAbsences() {
    yield takeEvery('employeesAbsencesReducer/getEmployeesAbsences', getEmployeesAbsencesSaga);
}

function* watchUpdateEmployeeAbsence() {
    yield takeEvery('employeesAbsencesReducer/updateEmployeeAbsenceStatus', updateEmployeeAbsenceSaga);
}


function* EmployeesAbsencesSaga() {
    yield all([
        fork(watchGetEmployeesAbsences),
        fork(watchUpdateEmployeeAbsence),
    ]);
}

export default EmployeesAbsencesSaga;