import { createSlice } from "@reduxjs/toolkit";

export const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
    pagination: null,
    employee: null,
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
    destroyEmployees: (state) => {
      state.loading = true;
      state.error = null;
    },
    destroyEmployeesSuccess: (state, action) => {
      state.loading = false;
      state.employees = state.employees.filter(
        (ja) =>
          !action.payload.deletedemployees.map((ja) => ja.id).includes(ja.id)
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
  getEmployee,
  getEmployeeSuccess,
  getEmployeeFail,
  /*  updateEmployee,
  updateEmployeeSuccess,
  updateEmployeeFail, */
  destroyEmployees,
  destroyEmployeesSuccess,
  destroyEmployeesFail,
} = employeesSlice.actions;

export default employeesSlice.reducer;
