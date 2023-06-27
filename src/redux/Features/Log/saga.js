import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import {
  getLogs,
  getLogsSuccess,
  getLogsFail,
  getActions,
  getActionsSuccess,
  getActionsFail,
} from "./slice";
import AxiosInstance from "../../../utils/axiosInstance";

const getAllLogs = ({
  page,
  status,
  severities,
  users,
  affectedUsers,
  user,
  affectedUser,
} = {}) => {
  const params = {
    ...(page && { page }),
    ...(status &&
      status.length > 0 && {
        status: status.join(","),
      }),
    ...(users && users.length > 0 && { users: users.join(",") }),
    ...(affectedUsers &&
      affectedUsers.length > 0 && {
        affectedUsers: affectedUsers.join(","),
      }),
    ...(severities &&
      severities.length > 0 && {
        severities: severities.join(","),
      }),
    ...(user && { user }),
    ...(affectedUser && { affectedUser }),
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
        pagination: {
          ...response.data,
          data: undefined,
        },
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

const getAll = (payload) => {
  return AxiosInstance().get("log/all-action");
};
function* getActionsSaga({ payload }) {
  try {
    const response = yield call(getAll, payload);
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

function* logsSaga() {
  yield all([fork(watchGetLogs), fork(watchGetActions)]);
}

export default logsSaga;
