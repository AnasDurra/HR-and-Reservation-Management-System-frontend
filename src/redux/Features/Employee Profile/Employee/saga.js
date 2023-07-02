import { all, fork, takeEvery, call, put } from 'redux-saga/effects';
import {
  createEmployee,
  createEmployeeSuccess,
  createEmployeeFail,
  getEmployees,
  getEmployeesSuccess,
  getEmployeesFail,
  getIndexedEmployees,
  getIndexedEmployeesSuccess,
  getIndexedEmployeesFail,
  getEmployee,
  getEmployeeSuccess,
  getEmployeeFail,
  getEmployeeDepartmentsHistory,
  getEmployeeDepartmentsHistorySuccess,
  getEmployeeDepartmentsHistoryFail,
  getEmployeeJobTitlesHistory,
  getEmployeeJobTitlesHistorySuccess,
  getEmployeeJobTitlesHistoryFail,
  getEmployeeAbsences,
  getEmployeeAbsencesSuccess,
  getEmployeeAbsencesFail,
  getEmployeeLogs,
  getEmployeeLogsSuccess,
  getEmployeeLogsFail,
  /*  updateEmployee,
  updateEmployeeSuccess,
  updateEmployeeFail, */
  updateEmployeeDepartment,
  updateEmployeeDepartmentSuccess,
  updateEmployeeDepartmentFail,
  updateEmployeeCredentials,
  updateEmployeeCredentialsSuccess,
  updateEmployeeCredentialsFail,
  updateEmployeeSchedule,
  updateEmployeeScheduleSuccess,
  updateEmployeeScheduleFail,
  updateEmployeeStatus,
  updateEmployeeStatusSuccess,
  updateEmployeeStatusFail,
  destroyEmployees,
  destroyEmployeesSuccess,
  destroyEmployeesFail,
} from './slice';
import AxiosInstance from '../../../utils/axiosInstance';
import { formatRequestAfterReceive } from '../../../../Features/EmployeesProfiles/Job Application/utils/helpers';
import { message } from 'antd';

const create = (payload) => {
  return AxiosInstance().post('employees', payload, {
    headers: {
      'Content-type': 'multipart/form-data',
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
    message.error({
      content: error?.response?.data?.errors
        ? Object.values(error.response.data.errors)[0][0] ?? null
        : null,
      style: {
        marginTop: '10vh',
        fontFamily: 'cairo',
      },
    });
    yield put(
      createEmployeeFail({
        error: error.response ? error.response.data.errors : null,
      })
    );
  }
}
function* watchCreateEmployee() {
  yield takeEvery(createEmployee, createEmployeeSaga);
}

const getAll = ({ page, status, dep, name, schedule, title } = {}) => {
  const params = {
    ...(page && { page }),
    ...(name && { name }),
    ...(dep && dep.length > 0 && { dep: dep.join(',') }),
    ...(status &&
      status.length > 0 && {
        status: status.join(','),
      }),
    ...(schedule && schedule.length > 0 && { schedule: schedule.join(',') }),
    ...(title && title.length > 0 && { title: title.join(',') }),
  };
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  console.log(queryString);

  return AxiosInstance().get(
    `employees${queryString ? `?${queryString}` : ''}`
  );
};
function* getEmployeesSaga({ payload }) {
  try {
    const response = yield call(getAll, payload);
    yield put(
      getEmployeesSuccess({
        employees: response.data.data,
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

const getAllIndexed = ({ page, name } = {}) => {
  const params = {
    ...(page && { page }),
    ...(name && { name }),
  };
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return AxiosInstance().get(
    `employees/list${queryString ? `?${queryString}` : ''}`
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
    var response = yield call(getOne, payload);
    response.data.data.job_application = formatRequestAfterReceive(
      response?.data?.data?.job_application
    );
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

const getDepartmentsHistory = ({ emp_id }) => {
  return AxiosInstance().get(`employees/department-history/${emp_id}`);
};
function* getEmployeeDepartmentsHistorySaga({ payload }) {
  try {
    var response = yield call(getDepartmentsHistory, payload);
    yield put(
      getEmployeeDepartmentsHistorySuccess({
        departmentsHistory: response.data,
      })
    );
  } catch (error) {
    yield put(
      getEmployeeDepartmentsHistoryFail({
        error: error,
      })
    );
  }
}
function* watchGetEmployeeDepartmentsHistory() {
  yield takeEvery(
    getEmployeeDepartmentsHistory,
    getEmployeeDepartmentsHistorySaga
  );
}

const getJobTitlesHistory = ({ emp_id }) => {
  return AxiosInstance().get(`employees/job-title-history/${emp_id}`);
};
function* getEmployeeJobTitlesHistorySaga({ payload }) {
  try {
    var response = yield call(getJobTitlesHistory, payload);
    yield put(
      getEmployeeJobTitlesHistorySuccess({
        jobTitlesHistory: response.data,
      })
    );
  } catch (error) {
    yield put(
      getEmployeeJobTitlesHistoryFail({
        error: error,
      })
    );
  }
}
function* watchGetEmployeeJobTitlesHistory() {
  yield takeEvery(getEmployeeJobTitlesHistory, getEmployeeJobTitlesHistorySaga);
}

const getAbsences = ({ emp_id }) => {
  return AxiosInstance().get(`employees/absence/${emp_id}`);
};
function* getEmployeeAbsencesSaga({ payload }) {
  try {
    var response = yield call(getAbsences, payload);
    yield put(
      getEmployeeAbsencesSuccess({
        absences: response.data,
      })
    );
  } catch (error) {
    yield put(
      getEmployeeAbsencesFail({
        error: error,
      })
    );
  }
}
function* watchGetEmployeeAbsences() {
  yield takeEvery(getEmployeeAbsences, getEmployeeAbsencesSaga);
}

const getLogs = ({ emp_id }) => {
  return AxiosInstance().get(`employees/log/${emp_id}`);
};
function* getEmployeeLogsSaga({ payload }) {
  try {
    var response = yield call(getLogs, payload);
    yield put(
      getEmployeeLogsSuccess({
        employeeLogs: response.data,
      })
    );
  } catch (error) {
    yield put(
      getEmployeeLogsFail({
        error: error,
      })
    );
  }
}
function* watchGetEmployeeLogs() {
  yield takeEvery(getEmployeeLogs, getEmployeeLogsSaga);
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

const updateSchedule = ({ emp_id, schedule_id }) => {
  return AxiosInstance().post(`employees/edit-schedule/${emp_id}`, {
    schedule_id,
  });
};
function* updateEmployeeScheduleSaga({ payload }) {
  try {
    const response = yield call(updateSchedule, payload);
    yield put(
      updateEmployeeScheduleSuccess({
        schedule: response.data.data,
      })
    );
  } catch (error) {
    console.log(error);
    yield put(
      updateEmployeeScheduleFail({
        error: error,
      })
    );
  }
}
function* watchUpdateEmployeeSchedule() {
  yield takeEvery(updateEmployeeSchedule, updateEmployeeScheduleSaga);
}

const updateStatus = ({ emp_id, emp_status_id }) => {
  return AxiosInstance().post(`/employees/edit-employment-status/${emp_id}`, {
    emp_status_id,
  });
};
function* updateEmployeeStatusSaga({ payload }) {
  try {
    const response = yield call(updateStatus, payload);
    yield put(
      updateEmployeeStatusSuccess({
        current_employment_status:
          response.data.employment_status?.emp_status_id,
      })
    );
  } catch (error) {
    console.log(error);
    yield put(
      updateEmployeeStatusFail({
        error: error,
      })
    );
  }
}
function* watchUpdateEmployeeStatus() {
  yield takeEvery(updateEmployeeStatus, updateEmployeeStatusSaga);
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
    fork(watchGetEmployeeDepartmentsHistory),
    fork(watchGetEmployeeJobTitlesHistory),
    fork(watchGetEmployeeAbsences),
    fork(watchGetEmployeeLogs),
    fork(watchUpdateEmployeeDepartment),
    fork(watchUpdateEmployeeCredentials),
    fork(watchUpdateEmployeeSchedule),
    fork(watchUpdateEmployeeStatus),
    /*     fork(watchUpdateEmployee), */
    fork(watchDestroyEmployees),
  ]);
}

export default employeesSaga;
