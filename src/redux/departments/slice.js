import { createSlice } from "@reduxjs/toolkit";

export const departmentsSlice = createSlice({
  name: "departments",
  initialState: {
    departments: [],
    loading: false,
    error: null,
  },
  reducers: {
    createDepartment: (state) => {
      state.loading = true;
      state.error = null;
    },
    createDepartmentSuccess: (state, action) => {
      state.loading = false;
      state.departments.push(action.payload.department);
    },
    createDepartmentFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    getDepartments: (state) => {
      state.loading = true;
      state.error = null;
    },
    getDepartmentsSuccess: (state, action) => {
      state.loading = false;
      state.departments = action.payload.departments;
    },
    getDepartmentsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    updateDepartment: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateDepartmentSuccess: (state, action) => {
      state.loading = false;
      state.departments = state.departments.map((department) =>
        department.dep_id === action.payload.department.dep_id
          ? action.payload.department
          : department
      );
    },
    updateDepartmentFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    destroyDepartment: (state) => {
      state.loading = true;
      state.error = null;
    },
    destroyDepartmentSuccess: (state, action) => {
      state.loading = false;
      state.departments = state.departments.filter(
        (department) => department.dep_id !== action.payload.department.dep_id
      );
    },
    destroyDepartmentFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  createDepartment,
  createDepartmentSuccess,
  createDepartmentFail,
  getDepartments,
  getDepartmentsSuccess,
  getDepartmentsFail,
  updateDepartment,
  updateDepartmentSuccess,
  updateDepartmentFail,
  destroyDepartment,
  destroyDepartmentSuccess,
  destroyDepartmentFail,
} = departmentsSlice.actions;

export default departmentsSlice.reducer;
