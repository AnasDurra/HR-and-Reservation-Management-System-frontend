import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import {
  createEmployee,
  createEmployeeFail,
  createEmployeeSuccess,
  getEmployees,
  getEmployeesFail,
  getEmployeesSuccess,
  getEmployee,
  getEmployeeSuccess,
  getEmployeeFail,
  getIndexedEmployees,
  getIndexedEmployeesSuccess,
  getIndexedEmployeesFail,
  /*  updateEmployee,
  updateEmployeeSuccess,
  updateEmployeeFail, */
  updateEmployeeDepartment,
  updateEmployeeDepartmentSuccess,
  updateEmployeeDepartmentFail,
  updateEmployeeCredentials,
  updateEmployeeCredentialsSuccess,
  updateEmployeeCredentialsFail,
  destroyEmployees,
  destroyEmployeesSuccess,
  destroyEmployeesFail,
} from "./slice";
import AxiosInstance from "../../../utils/axiosInstance";

const create = (payload) => {
  return AxiosInstance().post("employees", payload, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
};
function* createEmployeeSaga({ payload }) {
  try {
    const response = yield call(create, payload);
    yield put(
      createEmployeeSuccess({
        employee: response.data.data,
      })
    );
  } catch (error) {
    yield put(
      createEmployeeFail({
        error: error,
      })
    );
  }
}
function* watchCreateEmployee() {
  yield takeEvery(createEmployee, createEmployeeSaga);
}

const getAll = ({ page, status, dep, name } = {}) => {
  const params = {
    ...(page && { page }),
    ...(status &&
      status.length > 0 && {
        status: status.join(","),
      }),
    ...(dep && dep.length > 0 && { dep: dep.join(",") }),
    ...(name && { name }),
  };
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  console.log(queryString);

  return AxiosInstance().get(
    `employees${queryString ? `?${queryString}` : ""}`
  );
};

function* getEmployeesSaga({ payload }) {
  try {
    const response = yield call(getAll, payload);
    yield put(
      getEmployeesSuccess({
        Employees: response.data.data,
        pagination: {
          ...response.data,
          data: undefined,
        },
      })
    );
  } catch (error) {
    yield put(
      getEmployeesFail({
        error: error,
      })
    );
  }
}
function* watchGetEmployees() {
  yield takeEvery(getEmployees, getEmployeesSaga);
}

const getAllIndexed = (payload) => {
  return AxiosInstance().get(
    `employees/list${payload ? `?page=${payload}` : ""}`
  );
};
function* getIndexedEmployeesSaga({ payload }) {
  try {
    const response = yield call(getAllIndexed, payload);
    yield put(
      getIndexedEmployeesSuccess({
        indexedEmployees: response.data.data,
        pagination: {
          ...response.data,
          data: undefined,
        },
      })
    );
  } catch (error) {
    yield put(
      getIndexedEmployeesFail({
        error: error,
      })
    );
  }
}
function* watchGetIndexedEmployees() {
  yield takeEvery(getIndexedEmployees, getIndexedEmployeesSaga);
}

const getOne = (payload) => {
  return AxiosInstance().get(`employees/${payload}`);
};

function* getEmployeeSaga({ payload }) {
  try {
    const response = yield call(getOne, payload);
    yield put(
      getEmployeeSuccess({
        employee: response.data.data,
      })
    );
  } catch (error) {
    yield put(
      getEmployeeFail({
        error: error,
      })
    );
  }
}
function* watchGetEmployee() {
  yield takeEvery(getEmployee, getEmployeeSaga);
}

const updateDepartment = (payload) => {
  console.log(payload);
  return AxiosInstance().post(`employees/edit-department/${payload.id}`, {
    dep_id: payload.dep_id,
  });
};

function* updateEmployeeDepartmentSaga({ payload }) {
  try {
    const response = yield call(updateDepartment, payload);
    yield put(
      updateEmployeeDepartmentSuccess({
        department: response.data.data,
      })
    );
  } catch (error) {
    console.log(error);
    yield put(
      updateEmployeeDepartmentFail({
        error: error,
      })
    );
  }
}
function* watchUpdateEmployeeDepartment() {
  yield takeEvery(updateEmployeeDepartment, updateEmployeeDepartmentSaga);
}

const updateCredentials = (payload) => {
  console.log(payload);
  return AxiosInstance().post(`employees/edit-credentials/${payload.id}`, {
    username: payload.username,
    password: payload.password,
  });
};

function* updateEmployeeCredentialsSaga({ payload }) {
  try {
    const response = yield call(updateCredentials, payload);
    yield put(
      updateEmployeeCredentialsSuccess({
        Credentials: response.data.data,
      })
    );
  } catch (error) {
    console.log(error);
    yield put(
      updateEmployeeCredentialsFail({
        error: error,
      })
    );
  }
}
function* watchUpdateEmployeeCredentials() {
  yield takeEvery(updateEmployeeCredentials, updateEmployeeCredentialsSaga);
}

const destroy = (payload) => {
  return AxiosInstance().post(`employees/destroy`, { ids: payload });
};

function* destroyEmployeesSaga({ payload }) {
  try {
    const response = yield call(destroy, payload);
    yield put(
      destroyEmployeesSuccess({
        deletedEmployees: response.data.data,
      })
    );
  } catch (error) {
    console.log(error);
    yield put(
      destroyEmployeesFail({
        error: error,
      })
    );
  }
}
function* watchDestroyEmployees() {
  yield takeEvery(destroyEmployees, destroyEmployeesSaga);
}

function* employeesSaga() {
  yield all([
    fork(watchCreateEmployee),
    fork(watchGetEmployees),
    fork(watchGetIndexedEmployees),
    fork(watchGetEmployee),
    fork(watchUpdateEmployeeDepartment),
    fork(watchUpdateEmployeeCredentials),
    /*     fork(watchUpdateEmployee), */
    fork(watchDestroyEmployees),
  ]);
}

export default employeesSaga;
