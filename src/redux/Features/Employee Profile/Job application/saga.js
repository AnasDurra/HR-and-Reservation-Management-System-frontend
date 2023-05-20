import { all, fork, takeEvery, call, put } from "redux-saga/effects";

import {
  createJobApplication,
  createJobApplicationFail,
  createJobApplicationSuccess,
  getJobApplications,
  getJobApplicationsFail,
  getJobApplicationsSuccess
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
    console.log(error);
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



function* jobApplicationsSaga() {
  yield all([fork(watchCreateJobApplication),fork(watchGetJobApplications)]);
}

export default jobApplicationsSaga;
