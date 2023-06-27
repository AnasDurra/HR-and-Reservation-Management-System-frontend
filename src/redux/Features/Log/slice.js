import { createSlice } from "@reduxjs/toolkit";

export const logSlice = createSlice({
  name: "log",
  initialState: {
    logs: [],
    actions: [],
    pagination: null,
    loading: false,
    error: null,
  },
  reducers: {
    getLogs: (state) => {
      state.loading = true;
      state.error = null;
    },
    getLogsSuccess: (state, action) => {
      state.loading = false;
      state.logs = action.payload.Logs;
    },
    getLogsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    getActions: (state) => {
      state.loading = true;
      state.error = null;
    },
    getActionsSuccess: (state, action) => {
      state.loading = false;
      state.actions = action.payload.actions;
    },
    getActionsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  getLogs,
  getLogsSuccess,
  getLogsFail,
  getActions,
  getActionsSuccess,
  getActionsFail,
} = logSlice.actions;

export default logSlice.reducer;
