import { createSlice } from "@reduxjs/toolkit";

export const jobApplicationsSlice = createSlice({
  name: "jobApplications",
  initialState: {
    jobApplications: [],
    pagination: null,
    jobApplication: null,
    loading: false,
    error: null,
  },
  reducers: {
    createJobApplication: (state) => {
      state.loading = true;
      state.error = null;
    },
    createJobApplicationSuccess: (state, action) => {
      state.loading = false;
      state.jobApplications.push(action.payload.jobApplication);
    },
    createJobApplicationFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    getJobApplications: (state) => {
      state.loading = true;
      state.error = null;
    },
    getJobApplicationsSuccess: (state, action) => {
      state.loading = false;
      state.jobApplications = action.payload.jobApplications;
      state.pagination = action.payload.pagination;
    },
    getJobApplicationsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    getJobApplication: (state) => {
      state.loading = true;
      state.error = null;
    },
    getJobApplicationSuccess: (state, action) => {
      state.loading = false;
      state.jobApplication = action.payload.jobApplication;
    },
    getJobApplicationFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    updateJobApplication: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateJobApplicationSuccess: (state, action) => {
      state.loading = false;
      state.jobApplication = action.payload.jobApplication;
    },
    updateJobApplicationFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    destroyJobApplications: (state) => {
      state.loading = true;
      state.error = null;
    },
    destroyJobApplicationsSuccess: (state, action) => {
      state.loading = false;
      state.jobApplications = state.jobApplications.filter(
        (ja) =>
          !action.payload.deletedJobApplications
            .map((ja) => ja.id)
            .includes(ja.id)
      );
    },
    destroyJobApplicationsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  createJobApplication,
  createJobApplicationSuccess,
  createJobApplicationFail,
  getJobApplications,
  getJobApplicationsSuccess,
  getJobApplicationsFail,
  getJobApplication,
  getJobApplicationSuccess,
  getJobApplicationFail,
  updateJobApplication,
  updateJobApplicationSuccess,
  updateJobApplicationFail,
  destroyJobApplications,
  destroyJobApplicationsSuccess,
  destroyJobApplicationsFail,
} = jobApplicationsSlice.actions;

export default jobApplicationsSlice.reducer;
