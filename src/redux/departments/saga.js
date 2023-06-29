import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import {
  getDepartments,
  getDepartmentsFail,
  getDepartmentsSuccess,
  destroyDepartment,
  destroyDepartmentFail,
  destroyDepartmentSuccess,
  updateDepartment,
  updateDepartmentFail,
  updateDepartmentSuccess,
  createDepartment,
  createDepartmentFail,
  createDepartmentSuccess,
} from "./slice";
import AxiosInstance from "../utils/axiosInstance";
import { handleError } from "../utils/helpers";

const getAll = (payload) => {
  return AxiosInstance().get("departments", payload);
};

const destroyOne = (payload) => {
  return AxiosInstance().delete(`departments/${payload.id}`, payload);
};

const update = (payload) => {
  return AxiosInstance().put(`departments/${payload.id}`, payload);
};

const create = (payload) => {
  return AxiosInstance().post("departments", payload);
};

function* getDepartmentsSaga({ payload }) {
  try {
    const response = yield call(getAll, payload);
    yield put(
      getDepartmentsSuccess({
        departments: response.data.data,
      })
    );
  } catch (error) {
    yield put(
      getDepartmentsFail({
        error: error,
      })
    );
  }
}

function* destroyDepartmentSaga({ payload }) {
  try {
    const response = yield call(destroyOne, payload);
    yield put(
      destroyDepartmentSuccess({
        department: response.data.data,
      })
    );
  } catch (error) {
    if (error?.response?.data?.message === "There is one or more employees in the department") {
      handleError("يوجد موظف واحد أو اكثر مرتبط بهذا القسم");
    }
    yield put(
      destroyDepartmentFail({
        error: error,
      })
    );
  }
}

function* updateDepartmentSaga({ payload }) {
  try {
    const response = yield call(update, payload);
    yield put(
      updateDepartmentSuccess({
        department: response.data.data,
      })
    );
  } catch (error) {
    if (error?.response?.data?.data?.name[0] === "The name has already been taken.") {
      handleError("يوجد قسم آخر بنفس هذا الاسم");
    }
    yield put(
      updateDepartmentFail({
        error: error,
      })
    );
  }
}

function* createDepartmentSaga({ payload }) {
  try {
    const response = yield call(create, payload);
    yield put(
      createDepartmentSuccess({
        department: response.data.data,
      })
    );
  } catch (error) {
    if (error?.response?.data?.data?.name[0] === "The name has already been taken.") {
      handleError("يوجد قسم آخر بنفس هذا الاسم");
    }
    yield put(
      createDepartmentFail({
        error: error,
      })
    );
  }
}

function* watchGetDepartments() {
  yield takeEvery(getDepartments, getDepartmentsSaga);
}

function* watchDestroyDepartment() {
  yield takeEvery(destroyDepartment, destroyDepartmentSaga);
}

function* watchUpdateDepartment() {
  yield takeEvery(updateDepartment, updateDepartmentSaga);
}

function* watchCreateDepartment() {
  yield takeEvery(createDepartment, createDepartmentSaga);
}

function* DepartmentsSaga() {
  yield all([
    fork(watchGetDepartments),
    fork(watchDestroyDepartment),
    fork(watchUpdateDepartment),
    fork(watchCreateDepartment),
  ]);
}

export default DepartmentsSaga;
