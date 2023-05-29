import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import {
  createJobApplication,
  createJobApplicationFail,
  createJobApplicationSuccess,
  getJobApplications,
  getJobApplicationsFail,
  getJobApplicationsSuccess,
  getJobApplication,
  getJobApplicationSuccess,
  getJobApplicationFail,
} from "./slice";
import AxiosInstance from "../../../utils/axiosInstance";

const create = (payload) => {
  return AxiosInstance().post("job-applications", payload, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
};
function* createJobApplicationSaga({ payload }) {
  try {
    const response = yield call(create, payload);
    yield put(
      createJobApplicationSuccess({
        jobApplication: response.data.data,
      })
    );
  } catch (error) {
    yield put(
      createJobApplicationFail({
        error: error,
      })
    );
  }
}
function* watchCreateJobApplication() {
  yield takeEvery(createJobApplication, createJobApplicationSaga);
}

const getAll = () => {
  return AxiosInstance().get("job-applications");
};

function* getJobApplicationsSaga() {
  try {
    const response = yield call(getAll);
    yield put(
      getJobApplicationsSuccess({
        jobApplications: response.data.data,
      })
    );
  } catch (error) {
    console.log(error);
    yield put(
      getJobApplicationsFail({
        error: error,
      })
    );
  }
}
function* watchGetJobApplications() {
  yield takeEvery(getJobApplications, getJobApplicationsSaga);
}

const getOne = (payload) => {
  return AxiosInstance().get(`job-applications/${payload}`);
};

function* getJobApplicationSaga({ payload }) {
  try {
    const response = yield call(getOne, payload);
    yield put(
      getJobApplicationSuccess({
        jobApplication: response.data.data,
      })
    );
  } catch (error) {
    console.log(error);
    yield put(
      getJobApplicationFail({
        error: error,
      })
    );
  }
}
function* watchGetJobApplication() {
  yield takeEvery(getJobApplication, getJobApplicationSaga);
}

function* jobApplicationsSaga() {
  yield all([
    fork(watchCreateJobApplication),
    fork(watchGetJobApplications),
    fork(watchGetJobApplication),
  ]);
}

export default jobApplicationsSaga;
