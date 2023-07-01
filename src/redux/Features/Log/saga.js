import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import {
  getLogs,
  getLogsSuccess,
  getLogsFail,
  getActions,
  getActionsSuccess,
  getActionsFail,
  getActionedUsers,
  getActionedUsersSuccess,
  getActionedUsersFail,
  getAffectedUsers,
  getAffectedUsersSuccess,
  getAffectedUsersFail,
} from "./slice";
import AxiosInstance from "../../utils/axiosInstance";

const getAllLogs = ({
  page,
  action,
  action_severity,
  actioned_user,
  affected_user,
  actioned_user_name,
  affected_user_name,
  start_date,
  end_date,
} = {}) => {
  const params = {
    ...(page && { page }),
    ...(start_date && { start_date }),
    ...(end_date && { end_date }),
    ...(actioned_user_name && { actioned_user_name }),
    ...(affected_user_name && { affected_user_name }),
    ...(action &&
      action.length > 0 && {
        action: action.join(","),
      }),
    ...(action_severity &&
      action_severity.length > 0 && {
        action_severity: action_severity.join(","),
      }),
    ...(actioned_user &&
      actioned_user.length > 0 && { actioned_user: actioned_user.join(",") }),
    ...(affected_user &&
      affected_user.length > 0 && {
        affected_user: affected_user.join(","),
      }),
    ...(severities &&
      severities.length > 0 && {
        severities: severities.join(","),
      }),
  };
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  console.log(queryString);

  return AxiosInstance().get(`logs${queryString ? `?${queryString}` : ""}`);
};

function* getLogsSaga({ payload }) {
  try {
    const response = yield call(getAllLogs, payload);
    yield put(
      getLogsSuccess({
        logs: response.data.data,
        meta: response.data.meta,
      })
    );
  } catch (error) {
    yield put(
      getLogsFail({
        error: error,
      })
    );
  }
}
function* watchGetLogs() {
  yield takeEvery(getLogs, getLogsSaga);
}

const getAllActions = ({ page }) => {
  return AxiosInstance().get("log/all-action");
};
function* getActionsSaga({ payload }) {
  try {
    const response = yield call(getAllActions, payload);
    yield put(
      getActionsSuccess({
        actions: response.data.data,
      })
    );
  } catch (error) {
    yield put(
      getActionsFail({
        error: error,
      })
    );
  }
}
function* watchGetActions() {
  yield takeEvery(getActions, getActionsSaga);
}

const getAllActionedUsers = ({ page, name } = {}) => {
  const params = {
    ...(page && { page }),
    ...(name && { name }),
  };
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  console.log("g");
  return AxiosInstance().get(
    `log/all-user${queryString ? `?${queryString}` : ""}`
  );
};
function* getActionedUsersSaga({ payload }) {
  try {
    const response = yield call(getAllActionedUsers, payload);
    yield put(
      getActionedUsersSuccess({
        actionedUsers: response.data.data,
        meta: response.data.meta,
      })
    );
  } catch (error) {
    yield put(
      getActionedUsersFail({
        error: error,
      })
    );
  }
}
function* watchGetActionedUsers() {
  yield takeEvery(getActionedUsers, getActionedUsersSaga);
}

const getAllAffectedUsers = ({ page, name } = {}) => {
  const params = {
    ...(page && { page }),
    ...(name && { name }),
  };
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return AxiosInstance().get(
    `log/all-affected-user${queryString ? `?${queryString}` : ""}`
  );
};
function* getAffectedUsersSaga({ payload }) {
  try {
    const response = yield call(getAllAffectedUsers, payload);
    yield put(
      getAffectedUsersSuccess({
        affectedUsers: response.data.data,
        meta: response.data.meta,
      })
    );
  } catch (error) {
    yield put(
      getAffectedUsersFail({
        error: error,
      })
    );
  }
}
function* watchGetAffectedUsers() {
  yield takeEvery(getAffectedUsers, getAffectedUsersSaga);
}

function* logSaga() {
  yield all([
    fork(watchGetLogs),
    fork(watchGetActions),
    fork(watchGetActionedUsers),
    fork(watchGetAffectedUsers),
  ]);
}

export default logSaga;
