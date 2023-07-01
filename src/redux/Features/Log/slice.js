import { createSlice } from "@reduxjs/toolkit";

export const logSlice = createSlice({
  name: "log",
  initialState: {
    logs: [],
    logsMeta: null,
    actions: [],
    actionedUsers: [],
    actionedUsersMeta: null,
    affectedUsers: [],
    affectedUsersMeta: null,
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
      state.logs = action.payload.logs;
      state.meta = action.payload.meta;
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

    getActionedUsers: (state) => {
      state.loading = true;
      state.error = null;
    },
    getActionedUsersSuccess: (state, action) => {
      state.loading = false;
      state.actionedUsers = action.payload.actionedUsers;
      state.actionedUsersMeta = action.payload.meta;
    },
    getActionedUsersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    getAffectedUsers: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAffectedUsersSuccess: (state, action) => {
      state.loading = false;
      state.affectedUsers = action.payload.affectedUsers;
      state.affectedUsersMeta = action.payload.meta;
    },
    getAffectedUsersFail: (state, action) => {
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

  getActionedUsers,
  getActionedUsersSuccess,
  getActionedUsersFail,

  getAffectedUsers,
  getAffectedUsersSuccess,
  getAffectedUsersFail,
} = logSlice.actions;

export default logSlice.reducer;
