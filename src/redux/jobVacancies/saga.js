import {all, fork, takeEvery, call, put} from "redux-saga/effects";
import * as actionTypes from './constants';
import * as actions from './actions';
import AxiosInstance from "../utils/axiosInstance";

const getJobVacancies = (payload) => {
    return AxiosInstance().get('endPoint', payload);
}

const deleteJobVacancy = (payload) => {
    return AxiosInstance().delete('endPoint', payload);
}

const updateJobVacancy = (payload) => {
    return AxiosInstance().put('endPoint', payload);
}

const createJobVacancy = (payload) => {
    return AxiosInstance().post('endPoint', payload);
}


function* getJobVacanciesSaga({payload}) {
    try {
        const response = yield call(getJobVacancies, payload);
        yield put(actions.getJobVacanciesSuccess({
            jobVacancies: response.data.data,
        }));
    }
    catch(error) {
        yield put(actions.getJobVacanciesFailed({                                                                         
            error: error
        }));
    }
}

function* deletejobVacancySaga({payload}) {
    try {
        const response = yield call(deleteJobVacancy, payload);
        yield put(actions.deleteJobVacancySuccess({
            JobVacancy: response.data.data,
        }));
    }
    catch(error) {
        yield put(actions.deleteJobVacancyFailed({                                                                         
            error: error
        }));
    }
}

function* updateJobVacancySaga({payload}) {
    try {
        const response = yield call(updateJobVacancy, payload);
        yield put(actions.updateJobVacancySuccess({
            JobVacancy: response.data.data,
        }));
    }
    catch(error) {
        yield put(actions.updateJobVacancyFailed({                                                                         
            error: error
        }));
    }
}

function* createJobVacancySaga({payload}) {
    try {
        const response = yield call(createJobVacancy, payload);
        yield put(actions.createJobVacancySuccess({
            JobVacancy: response.data.data,
        }));
    }
    catch(error) {
        yield put(actions.createJobVacancyFailed({                                                                         
            error: error
        }));
    }
}

function* watchGetJobVacancies () {
    yield takeEvery(actionTypes.GET_JOB_VACANCIES, getJobVacanciesSaga);
}

function* watchDeleteJobVacancy () {
    yield takeEvery(actionTypes.DELETE_JOB_VACANCY, deletejobVacancySaga);
}

function* watchUpdateJobVacancy () {
    yield takeEvery(actionTypes.UPDATE_JOB_VACANCY, updateJobVacancySaga);
}

function* watchCreateJobVacancy () {
    yield takeEvery(actionTypes.CREATE_JOB_VACANCY, createJobVacancySaga);
}



function* JobVacanciesSaga() {
    yield all([
        fork(watchGetJobVacancies),
        fork(watchDeleteJobVacancy),
        fork(watchUpdateJobVacancy),
        fork(watchCreateJobVacancy),
    ]);
}

export default JobVacanciesSaga;