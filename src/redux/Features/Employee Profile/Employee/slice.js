import { createSlice } from '@reduxjs/toolkit';

export const employeesSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: [],
    indexedEmployees: [],
    departmentsHistory: [],
    jobTitlesHistory: [],
    pagination: null,
    employee: null,
    employeeAbsences: [],
    employeeLogs: [],
    loading: false,
    error: null,
  },
  reducers: {
    createEmployee: (state) => {
      state.loading = true;
      state.error = null;
    },
    createEmployeeSuccess: (state, action) => {
      state.loading = false;
      state.employees.push(action.payload.employee);
    },
    createEmployeeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    getEmployees: (state) => {
      state.loading = true;
      state.error = null;
    },
    getEmployeesSuccess: (state, action) => {
      state.loading = false;
      state.employees = action.payload.employees;
      state.pagination = action.payload.pagination;
    },
    getEmployeesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    getIndexedEmployees: (state) => {
      state.loading = true;
      state.error = null;
    },
    getIndexedEmployeesSuccess: (state, action) => {
      state.loading = false;
      state.indexedEmployees = action.payload.indexedEmployees;
      state.pagination = action.payload.pagination;
    },
    getIndexedEmployeesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    getEmployee: (state) => {
      state.loading = true;
      state.error = null;
    },
    getEmployeeSuccess: (state, action) => {
      state.loading = false;
      state.employee = action.payload.employee;
    },
    getEmployeeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    getEmployeeDepartmentsHistory: (state) => {
      state.loading = true;
      state.error = null;
    },
    getEmployeeDepartmentsHistorySuccess: (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.departmentsHistory = action.payload.departmentsHistory;
    },
    getEmployeeDepartmentsHistoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    getEmployeeJobTitlesHistory: (state) => {
      state.loading = true;
      state.error = null;
    },
    getEmployeeJobTitlesHistorySuccess: (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.jobTitlesHistory = action.payload.jobTitlesHistory;
    },
    getEmployeeJobTitlesHistoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    getEmployeeAbsences: (state) => {
      state.loading = true;
      state.error = null;
    },
    getEmployeeAbsencesSuccess: (state, action) => {
      state.loading = false;
      state.employeeAbsences = action.payload.absences;
    },
    getEmployeeAbsencesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    getEmployeeLogs: (state) => {
      state.loading = true;
      state.error = null;
    },
    getEmployeeLogsSuccess: (state, action) => {
      state.loading = false;
      state.employeeLogs = action.payload.employeeLogs;
    },
    getEmployeeLogsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    /*   updateEmployee: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateEmployeeSuccess: (state, action) => {
      state.loading = false;
      state.employee = action.payload.employee;
    },
    updateemployeeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    }, */

    updateEmployeeDepartment: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateEmployeeDepartmentSuccess: (state, action) => {
      state.loading = false;
      console.log('action:', action);
      /*       state.employee = action.payload.employee;
       */
    },
    updateEmployeeDepartmentFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    updateEmployeeCredentials: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateEmployeeCredentialsSuccess: (state, action) => {
      state.loading = false;
      console.log('action:', action);
      //TODO update state
      /*       state.employee = action.payload.employee;
       */
    },
    updateEmployeeCredentialsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    updateEmployeeSchedule: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateEmployeeScheduleSuccess: (state, action) => {
      state.loading = false;
      console.log('action:', action);
      state.employee.schedule = action.payload.schedule;
    },
    updateEmployeeScheduleFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    updateEmployeeStatus: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateEmployeeStatusSuccess: (state, action) => {
      state.loading = false;
      state.employee.current_employment_status =
        action.payload.current_employment_status;
    },
    updateEmployeeStatusFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    destroyEmployees: (state) => {
      state.loading = true;
      state.error = null;
    },
    destroyEmployeesSuccess: (state, action) => {
      state.loading = false;
      state.employees = state.employees.filter(
        (ja) =>
          !action.payload.deletedEmployees.map((ja) => ja.id).includes(ja.id)
      );
    },
    destroyEmployeesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
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
} = employeesSlice.actions;

export default employeesSlice.reducer;
