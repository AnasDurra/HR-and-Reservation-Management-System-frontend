import { all, fork, takeEvery, call, put } from 'redux-saga/effects';
import {
  createAppointments,
  createAppointmentsFail,
  createAppointmentsSuccess,
  createPhoneReservation,
  createPhoneReservationSuccess,
  createPhoneReservationFail,
  getConsultantAppointments,
  getConsultantAppointmentsSuccess,
  getConsultantAppointmentsFail,
  getCancelledConsultingAppointments,
  getCancelledConsultingAppointmentsSuccess,
  getCancelledConsultingAppointmentsFail,
  getAppointments,
  getAppointmentsFail,
  getAppointmentsSuccess,
  updateAppointment,
  updateAppointmentSuccess,
  updateAppointmentFail,
  cancelReservation,
  cancelReservationSuccess,
  cancelReservationFail,
  cancelAppointment,
  cancelAppointmentSuccess,
  cancelAppointmentFail,
} from './slice';
import AxiosInstance from '../../../utils/axiosInstance';

const create = (payload) => {
  return AxiosInstance().post('add-work-day', payload);
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

const phoneReservation = ({ id }) => {
  return AxiosInstance().post(`smth/${id}`);
};

function* createPhoneReservationSaga({ payload }) {
  try {
    const response = yield call(phoneReservation, payload);
    yield put(
      createPhoneReservationSuccess({
        appointment: response.data.data,
      })
    );
  } catch (error) {
    console.log(error);
    yield put(
      createPhoneReservationFail({
        error: error,
      })
    );
  }
}
function* watchCreatePhoneReservation() {
  yield takeEvery(createPhoneReservation, createPhoneReservationSaga);
}

const update = ({ appointment_id, customer_id }) => {
  return AxiosInstance().put(`book-by-employee/${appointment_id}/${customer_id}`);
};
function* updateAppointmentSaga({ payload }) {
  try {
    const response = yield call(update, payload);
    yield put(
      updateAppointmentSuccess({
        appointment: response.data.data,
      })
    );
  } catch (error) {
    yield put(
      updateAppointmentFail({
        error: error,
      })
    );
  }
}
function* watchUpdateAppointment() {
  yield takeEvery(updateAppointment, updateAppointmentSaga);
}

const getAllConsultant = ({ start_date, end_date } = {}) => {
  const params = {
    ...(start_date && { start_date }),
    ...(end_date && { end_date }),
  };
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return AxiosInstance().get(`consultant-schedule${queryString ? `?${queryString}` : ''}`);
};

function* getConsultantAppointmentsSaga({ payload }) {
  try {
    const response = yield call(getAllConsultant, payload);
    yield put(
      getConsultantAppointmentsSuccess({
        appointments: response.data.data,
      })
    );
  } catch (error) {
    yield put(
      getConsultantAppointmentsFail({
        error: error,
      })
    );
  }
}

function* watchGetConsultantAppointments() {
  yield takeEvery(getConsultantAppointments, getConsultantAppointmentsSaga);
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

const getAllCancelled = ({ start_date, end_date, consultant_id, page } = {}) => {
  const params = {
    ...(start_date && { start_date }),
    ...(end_date && { end_date }),
    ...(page && { page }),
    ...(consultant_id && { consultant_id }),
  };
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return AxiosInstance().get(`canceled-appointment${queryString ? `?${queryString}` : ''}`);
};

function* getCancelledConsultingAppointmentsSaga({ payload }) {
  try {
    const response = yield call(getAllCancelled, payload);
    yield put(
      getCancelledConsultingAppointmentsSuccess({
        appointments: response.data.data,
        meta: response.data.meta,
      })
    );
  } catch (error) {
    yield put(
      getCancelledConsultingAppointmentsFail({
        error: error,
      })
    );
  }
}
function* watchGetCancelledConsultingAppointments() {
  yield takeEvery(getCancelledConsultingAppointments, getCancelledConsultingAppointmentsSaga);
}

const cancelReserve = ({ id }) => {
  return AxiosInstance().post(`cancel-reservation-by-employee/${id}`);
};

function* cancelReservationSaga({ payload }) {
  try {
    const response = yield call(cancelReserve, payload);
    yield put(
      cancelReservationSuccess({
        appointment: response.data.data,
      })
    );
  } catch (error) {
    console.log(error);
    yield put(
      cancelReservationFail({
        error: error,
      })
    );
  }
}
function* watchCancelReservation() {
  yield takeEvery(cancelReservation, cancelReservationSaga);
}

const cancel = ({ id, isConsultant, isEmployee }) => {
  if (isConsultant) return AxiosInstance().put(`cancel-appointment/${id}`);
  else if (isEmployee) return AxiosInstance().post(`cancel-appointment-by-employee/${id}`);
};

function* cancelAppointmentSaga({ payload }) {
  try {
    const response = yield call(cancel, payload);
    yield put(
      cancelAppointmentSuccess({
        appointment: response.data.data,
      })
    );
  } catch (error) {
    console.log(error);
    yield put(
      cancelAppointmentFail({
        error: error,
      })
    );
  }
}
function* watchCancelAppointment() {
  yield takeEvery(cancelAppointment, cancelAppointmentSaga);
}

function* ConsultingAppointmentsSaga() {
  yield all([
    fork(watchCreateAppointments),
    fork(watchCreatePhoneReservation),
    fork(watchGetAppointments),
    fork(watchGetConsultantAppointments),
    fork(watchGetCancelledConsultingAppointments),
    fork(watchUpdateAppointment),
    fork(watchCancelReservation),
    fork(watchCancelAppointment),
  ]);
}

export default ConsultingAppointmentsSaga;
