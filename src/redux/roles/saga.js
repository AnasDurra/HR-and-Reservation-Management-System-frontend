import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import AxiosInstance from "../utils/axiosInstance";
import {
  createRole,
  createRoleSuccess,
  createRoleFail,
  getRoles,
  getRolesSuccess,
  getRolesFail,
  getPermissions,
  getPermissionsSuccess,
  getPermissionsFail,
  updateRole,
  updateRoleSuccess,
  updateRoleFail,
  destroyRole,
  destroyRoleSuccess,
  destroyRoleFail,
} from "./slice";
import { handleError } from "../utils/helpers";

const getAllRoles = (payload) => {
  return AxiosInstance().get("job-titles", payload);
};

const getAllPermissions = (payload) => {
  return AxiosInstance().get("permissions", payload);
};

const destroy = (payload) => {
  return AxiosInstance().delete(`job-titles/${payload.id}`, payload);
};

const update = (payload) => {
  return AxiosInstance().put(`job-titles/${payload.id}`, payload);
};

const create = (payload) => {
  return AxiosInstance().post("job-titles", payload);
};

function* getRolesSaga({ payload }) {
  try {
    const response = yield call(getAllRoles, payload);
    yield put(
      getRolesSuccess({
        roles: response.data.data,
      })
    );
  } catch (error) {
    yield put(
      getRolesFail({
        error: error,
      })
    );
  }
}

function* getPermissionsSaga({ payload }) {
  try {
    const response = yield call(getAllPermissions, payload);
    yield put(
      getPermissionsSuccess({
        permissions: response.data.data,
      })
    );
  } catch (error) {
    yield put(
      getPermissionsFail({
        error: error,
      })
    );
  }
}

function* deleteRoleSaga({ payload }) {
  try {
    const response = yield call(destroy, payload);
    yield put(
      destroyRoleSuccess({
        role: response.data.data,
      })
    );
  } catch (error) {
    if(error?.response?.data?.message === "There is one or more employees have this Job title") {
      handleError("لا يمكن حذف هذا المسمى الوظيفي, يوجد موظف أو اكثر مرتبط به.")
    }
    yield put(
      destroyRoleFail({
        error: error,
      })
    );
  }
}

function* updateRoleSaga({ payload }) {
  try {
    const response = yield call(update, payload);
    yield put(
      updateRoleSuccess({
        role: response.data.data,
      })
    );
  } catch (error) {
    yield put(
      updateRoleFail({
        error: error,
      })
    );
  }
}

function* createRoleSaga({ payload }) {
  try {
    const response = yield call(create, payload);
    yield put(
      createRoleSuccess({
        role: response.data.data,
      })
    );
  } catch (error) {
    yield put(
      createRoleFail({
        error: error,
      })
    );
  }
}

function* watchGetRoles() {
  yield takeEvery(getRoles, getRolesSaga);
}

function* watchGetPermissions() {
  yield takeEvery(getPermissions, getPermissionsSaga);
}

function* watchDeleteRole() {
  yield takeEvery(destroyRole, deleteRoleSaga);
}

function* watchUpdateRole() {
  yield takeEvery(updateRole, updateRoleSaga);
}

function* watchCreateRole() {
  yield takeEvery(createRole, createRoleSaga);
}

function* RolesSaga() {
  yield all([
    fork(watchGetRoles),
    fork(watchDeleteRole),
    fork(watchUpdateRole),
    fork(watchCreateRole),
    fork(watchGetPermissions),
  ]);
}

export default RolesSaga;
