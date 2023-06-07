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
  updateJobApplication,
  updateJobApplicationSuccess,
  updateJobApplicationFail,
  destroyJobApplications,
  destroyJobApplicationsSuccess,
  destroyJobApplicationsFail,
} from "./slice";
import AxiosInstance from "../../../utils/axiosInstance";
import {
  formatRequestAfterReceive,
  formatRequestBeforeSend,
} from "../../../../Features/EmployeesProfiles/Job Application/utils/helpers";

const create = (payload) => {
  return AxiosInstance().post(
    "job-applications",
    formatRequestBeforeSend(payload),
    {
      headers: {
        "Content-type": "multipart/form-data",
      },
    }
  );
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

const getAll = (payload) => {
  return AxiosInstance().get(
    `job-applications${payload ? `?page=${payload}` : ""}`
  );
};

function* getJobApplicationsSaga({ payload }) {
  try {
    const response = yield call(getAll, payload);
    yield put(
      getJobApplicationsSuccess({
        jobApplications: response.data.data,
        pagination: {
          ...response.data,
          data: undefined,
        },
      })
    );
  } catch (error) {
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
        jobApplication: formatRequestAfterReceive(response.data.data),
      })
    );
  } catch (error) {
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

const update = (payload) => {
  return AxiosInstance().post(
    `job-applications/update/${payload.id}`,
    formatRequestBeforeSend(payload.form),
    {
      headers: {
        "Content-type": "multipart/form-data",
      },
    }
  );
};

function* updateJobApplicationSaga({ payload }) {
  try {
    const response = yield call(update, payload);
    yield put(
      updateJobApplicationSuccess({
        jobApplication: formatRequestAfterReceive(response.data.data),
      })
    );
  } catch (error) {
    console.log(error);
    yield put(
      updateJobApplicationFail({
        error: error,
      })
    );
  }
}
function* watchUpdateJobApplication() {
  yield takeEvery(updateJobApplication, updateJobApplicationSaga);
}

const destroy = (payload) => {
  return AxiosInstance().post(`job-applications/destroy`, { ids: payload });
};

function* destroyJobApplicationsSaga({ payload }) {
  try {
    const response = yield call(destroy, payload);
    yield put(
      destroyJobApplicationsSuccess({
        deletedJobApplications: response.data.data,
      })
    );
  } catch (error) {
    console.log(error);
    yield put(
      destroyJobApplicationsFail({
        error: error,
      })
    );
  }
}
function* watchDestroyJobApplications() {
  yield takeEvery(destroyJobApplications, destroyJobApplicationsSaga);
}

function* jobApplicationsSaga() {
  yield all([
    fork(watchCreateJobApplication),
    fork(watchGetJobApplications),
    fork(watchGetJobApplication),
    fork(watchUpdateJobApplication),
    fork(watchDestroyJobApplications),
  ]);
}

export default jobApplicationsSaga;
