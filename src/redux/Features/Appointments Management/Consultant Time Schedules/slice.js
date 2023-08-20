import { createSlice } from '@reduxjs/toolkit';

export const consultantTimeScheduleSlice = createSlice({
  name: 'time schedule',
  initialState: {
    timeSchedules: [],
    timeSchedule: null,
    loading: false,
    error: null,
  },
  reducers: {
    createTimeSchedule: (state) => {
      state.loading = true;
      state.error = null;
    },
    createTimeScheduleSuccess: (state, action) => {
      state.loading = false;
      state.timeSchedules.push(action.payload.timeSchedule);
    },
    createTimeScheduleFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    getTimeSchedule: (state) => {
      state.loading = true;
      state.error = null;
    },
    getTimeScheduleSuccess: (state, action) => {
      state.loading = false;
      state.timeSchedule = action.payload.timeSchedule;
    },
    getTimeScheduleFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    getTimeSchedules: (state) => {
      state.loading = true;
      state.error = null;
    },
    getTimeSchedulesSuccess: (state, action) => {
      state.loading = false;
      state.timeSchedules = action.payload.timeSchedules;
      state.pagination = action.payload.pagination;
    },
    getTimeSchedulesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    destroyTimeSchedule: (state) => {
      state.loading = true;
      state.error = null;
    },
    destroyTimeScheduleSuccess: (state, action) => {
      state.loading = false;
      state.timeSchedules = state.timeSchedules.filter((ts) => ts.id != action.payload.timeSchedule.id);
    },
    destroyTimeScheduleFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  createTimeSchedule,
  createTimeScheduleSuccess,
  createTimeScheduleFail,

  getTimeSchedule,
  getTimeScheduleSuccess,
  getTimeScheduleFail,

  destroyTimeSchedule,
  destroyTimeScheduleSuccess,
  destroyTimeScheduleFail,

  getTimeSchedules,
  getTimeSchedulesSuccess,
  getTimeSchedulesFail,
} = consultantTimeScheduleSlice.actions;

export default consultantTimeScheduleSlice.reducer;
