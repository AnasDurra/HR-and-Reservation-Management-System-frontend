import { all, fork, takeEvery, call, put } from 'redux-saga/effects';
import {
  createTimeSchedule,
  createTimeScheduleFail,
  createTimeScheduleSuccess,
  getTimeSchedules,
  getTimeSchedulesFail,
  getTimeSchedulesSuccess,
  destroyTimeSchedule,
  destroyTimeScheduleSuccess,
  destroyTimeScheduleFail,
} from './slice';
import AxiosInstance from '../../../utils/axiosInstance';
import { handleError, handleResponse } from '../../../utils/helpers';

const create = (payload) => {
  return AxiosInstance().post('time-sheet', payload);
};
function* createTimeScheduleSaga({ payload }) {
  try {
    const response = yield call(create, payload);
    yield put(
      createTimeScheduleSuccess({
        timeSchedule: response.data.data,
      })
    );
    handleResponse('تم إضافة جدول دوام جديد بنجاح');
  } catch (error) {
    if (error.response?.data?.message == 'The name is already EXISTS in the database.')
      handleError('الاسم مستخدم سابقاَ');
    else handleError('فشل اتمام العملية');

    yield put(
      createTimeScheduleFail({
        error: error,
      })
    );
  }
}
function* watchCreateTimeSchedule() {
  yield takeEvery(createTimeSchedule, createTimeScheduleSaga);
}

const getAll = ({ name } = {}) => {
  const params = {
    ...(name && { name }),
  };
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return AxiosInstance().get(`time-sheet${queryString ? `?${queryString}` : ''}`);
};

function* getTimeSchedulesSaga({ payload }) {
  try {
    const response = yield call(getAll, payload);
    yield put(
      getTimeSchedulesSuccess({
        timeSchedules: response.data.data,
      })
    );
  } catch (error) {
    yield put(
      getTimeSchedulesFail({
        error: error,
      })
    );
  }
}
function* watchGetTimeSchedules() {
  yield takeEvery(getTimeSchedules, getTimeSchedulesSaga);
}

const destroy = ({ id }) => {
  return AxiosInstance().delete(`time-sheet/${id}`);
};

function* destroyTimeScheduleSaga({ payload }) {
  try {
    const response = yield call(destroy, payload);
    yield put(
      destroyTimeScheduleSuccess({
        timeSchedule: response.data.data,
      })
    );

    handleResponse('تم الحذف بنجاح');
  } catch (error) {
    handleError('فشل اتمام العملية');
    console.log(error);

    yield put(
      destroyTimeScheduleFail({
        error: error,
      })
    );
  }
}
function* watchDestroyTimeSchedule() {
  yield takeEvery(destroyTimeSchedule, destroyTimeScheduleSaga);
}

function* ConsultantTimeSchedulesSaga() {
  yield all([fork(watchCreateTimeSchedule), fork(watchGetTimeSchedules), fork(watchDestroyTimeSchedule)]);
}

export default ConsultantTimeSchedulesSaga;
