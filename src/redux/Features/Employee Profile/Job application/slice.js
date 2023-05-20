import { createSlice } from "@reduxjs/toolkit";

export const jobApplicationsSlice = createSlice({
  name: "jobApplications",
  initialState: {
    jobApplications: [],
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
    },
    getJobApplicationsFail: (state, action) => {
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
  getJobApplicationsFail
} = jobApplicationsSlice.actions;

export default jobApplicationsSlice.reducer;
