import { all, fork, takeEvery, call, put } from 'redux-saga/effects';
import {
  getStatistics,
  getStatisticsSuccess,
  getStatisticsFail,
  getPrevStatistics,
  getPrevStatisticsSuccess,
  getPrevStatisticsFail,
  getNextStatistics,
  getNextStatisticsSuccess,
  getNextStatisticsFail,
} from './slice';

import AxiosInstance from '../utils/axiosInstance';

const getStats = ({ start_date, end_date } = {}) => {
  const params = {
    ...(start_date && { start_date }),
    ...(end_date && { end_date }),
  };
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return AxiosInstance().get(`dashboard${queryString ? `?${queryString}` : ''}`);
};

function* getStatisticsSaga({ payload }) {
  try {
    const response = yield call(getStats, payload);
    yield put(
      getStatisticsSuccess({
        statistics: response.data,
      })
    );
  } catch (error) {
    yield put(
      getStatisticsFail({
        error: error,
      })
    );
  }
}
function* watchGetStatistics() {
  yield takeEvery(getStatistics, getStatisticsSaga);
}

const getNextStats = ({ start_date, end_date } = {}) => {
  const params = {
    ...(start_date && { start_date }),
    ...(end_date && { end_date }),
  };
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return AxiosInstance().get(`dashboard${queryString ? `?${queryString}` : ''}`);
};

function* getNextStatisticsSaga({ payload }) {
  try {
    const response = yield call(getNextStats, payload);
    yield put(
      getNextStatisticsSuccess({
        statistics: response.data,
      })
    );
  } catch (error) {
    yield put(
      getNextStatisticsFail({
        error: error,
      })
    );
  }
}
function* watchGetNextStatistics() {
  yield takeEvery(getNextStatistics, getNextStatisticsSaga);
}

const getPrevStats = ({ start_date, end_date } = {}) => {
  const params = {
    ...(start_date && { start_date }),
    ...(end_date && { end_date }),
  };
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return AxiosInstance().get(`dashboard${queryString ? `?${queryString}` : ''}`);
};

function* getPrevStatisticsSaga({ payload }) {
  try {
    const response = yield call(getPrevStats, payload);
    yield put(
      getPrevStatisticsSuccess({
        statistics: response.data,
      })
    );
  } catch (error) {
    yield put(
      getPrevStatisticsFail({
        error: error,
      })
    );
  }
}
function* watchGetPrevStatistics() {
  yield takeEvery(getPrevStatistics, getPrevStatisticsSaga);
}

function* DashboardSaga() {
  yield all([fork(watchGetStatistics), fork(watchGetPrevStatistics), fork(watchGetNextStatistics)]);
}

export default DashboardSaga;
