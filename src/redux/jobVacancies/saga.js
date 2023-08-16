import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import AxiosInstance from "../utils/axiosInstance";
import { getJobVacanciesSuccess, getJobVacanciesFailed } from "./reducer";
import { addJobVacancySuccess, addJobVacancyFailed } from "./reducer";
import { deleteJobVacancySuccess, deleteJobVacancyFailed } from "./reducer";
import { updateJobVacancySuccess, updateJobVacancyFailed } from "./reducer";
import { handleError } from '../utils/helpers';


const getJobVacancies = (payload) => {
    const params = new URLSearchParams();

    if (payload?.name) {
        params.append('name', payload.name);
    }

    if (payload?.page) {
        params.append('page', payload.page);
    }

    return AxiosInstance().get(`job-vacancies?${params.toString()}`);
}

const deleteJobVacancy = (payload) => {
    return AxiosInstance().delete(`job-vacancies/${payload.id}`, payload);
}

const updateJobVacancy = (payload) => {
    return AxiosInstance().put(`job-vacancies/${payload.id}`, payload);
}

const createJobVacancy = (payload) => {
    return AxiosInstance().post('job-vacancies', payload);
}


function* getJobVacanciesSaga({ payload }) {
    try {
        const response = yield call(getJobVacancies, payload);
        yield put(getJobVacanciesSuccess(response.data));
    }
    catch (error) {
        yield put(getJobVacanciesFailed(error));
    }
}

function* deletejobVacancySaga({ payload }) {
    try {
        const response = yield call(deleteJobVacancy, payload);
        yield put(deleteJobVacancySuccess(response.data.data));
    }
    catch (error) {
        if (error?.response?.data?.message === "Job Vacancy is Archived") {
            handleError("لا يمكن حذف هذا الشاغر");
        }
        if (error?.response?.data?.message === "Job Vacancy is closed") {
            handleError("هذا الشاغر مغلق, لا يمكن حذفه");
        }
        if (error?.response?.data?.message === "there is one or more accepted employment applications") {
            handleError("يوجد طلب واحد أو اكثر مقبول في هذا الشاغر");
        }
        yield put(deleteJobVacancyFailed(error));
    }
}

function* updateJobVacancySaga({ payload }) {
    try {
        const response = yield call(updateJobVacancy, payload);
        yield put(updateJobVacancySuccess(response.data.data));
    }
    catch (error) {
        yield put(updateJobVacancyFailed(error));
    }
}

function* createJobVacancySaga({ payload }) {
    try {
        const response = yield call(createJobVacancy, payload);
        yield put(addJobVacancySuccess(response.data.data));
    }
    catch (error) {
        yield put(addJobVacancyFailed(error));
    }
}

function* watchGetJobVacancies() {
    yield takeEvery('jobVacanciesReducer/getJobVacancies', getJobVacanciesSaga);
}

function* watchDeleteJobVacancy() {
    yield takeEvery('jobVacanciesReducer/deleteJobVacancy', deletejobVacancySaga);
}

function* watchUpdateJobVacancy() {
    yield takeEvery('jobVacanciesReducer/updateJobVacancy', updateJobVacancySaga);
}

function* watchCreateJobVacancy() {
    yield takeEvery('jobVacanciesReducer/addJobVacancy', createJobVacancySaga);
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