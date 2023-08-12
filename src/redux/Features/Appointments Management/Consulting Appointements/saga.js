import { all, fork, takeEvery, call, put } from 'redux-saga/effects';
import {
  createAppointments,
  createAppointmentsFail,
  createAppointmentsSuccess,
  getAppointments,
  getAppointmentsFail,
  getAppointmentsSuccess,
  updateAppointment,
  updateAppointmentSuccess,
  updateAppointmentFail,
  destroyAppointment,
  destroyAppointmentSuccess,
  destroyAppointmentFail,
} from './slice';
import AxiosInstance from '../../../utils/axiosInstance';

const create = (payload) => {
  return AxiosInstance().post('smth', payload);
};
function* createAppointmentsSaga({ payload }) {
  try {
    const response = yield call(create, payload);
    yield put(
      createAppointmentsSuccess({
        Appointments: response.data.data,
      })
    );
  } catch (error) {
    yield put(
      createAppointmentsFail({
        error: error,
      })
    );
  }
}
function* watchCreateAppointments() {
  yield takeEvery(createAppointments, createAppointmentsSaga);
}

const getAll = ({ start_date, end_date } = {}) => {
  const params = {
    ...(start_date && { start_date }),
    ...(end_date && { end_date }),
  };
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return AxiosInstance().get(`smth${queryString ? `?${queryString}` : ''}`);
};

function* getAppointmentsSaga({ payload }) {
  try {
    const response = yield call(getAll, payload);
    yield put(
      getAppointmentsSuccess({
        appointments: response.data.data,
      })
    );
  } catch (error) {
    yield put(
      getAppointmentsFail({
        error: error,
      })
    );
  }
}
function* watchGetAppointments() {
  yield takeEvery(getAppointments, getAppointmentsSaga);
}

const destroy = ({ id }) => {
  return AxiosInstance().delete(`smth/${id}`);
};

function* destroyAppointmentSaga({ payload }) {
  try {
    const response = yield call(destroy, payload);
    yield put(
      destroyAppointmentSuccess({
        deletedAppointments: response.data.data,
      })
    );
  } catch (error) {
    yield put(
      destroyAppointmentFail({
        error: error,
      })
    );
  }
}
function* watchDestroyAppointment() {
  yield takeEvery(destroyAppointment, destroyAppointmentSaga);
}

function* ConsultantAppointmentsSaga() {
  yield all([fork(watchCreateAppointments), fork(watchGetAppointments), fork(watchDestroyAppointment)]);
}

export default ConsultantAppointmentsSaga;
