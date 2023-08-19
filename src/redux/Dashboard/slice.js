import { createSlice } from '@reduxjs/toolkit';

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    statistics: null,
    prevStatistics: null,
    nextStatistics: null,
  },
  reducers: {
    getStatistics: (state) => {
      state.loading = true;
      state.error = null;
    },
    getStatisticsSuccess: (state, action) => {
      state.loading = false;
      state.statistics = action.payload.statistics;
    },
    getStatisticsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    getPrevStatistics: (state) => {
      state.loading = true;
      state.error = null;
    },
    getPrevStatisticsSuccess: (state, action) => {
      state.loading = false;
      state.prevStatistics = action.payload.statistics;
    },
    getPrevStatisticsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    getNextStatistics: (state) => {
      state.loading = true;
      state.error = null;
    },
    getNextStatisticsSuccess: (state, action) => {
      state.loading = false;
      state.nextStatistics = action.payload.statistics;
    },
    getNextStatisticsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  getStatistics,
  getStatisticsSuccess,
  getStatisticsFail,
  getPrevStatistics,
  getPrevStatisticsSuccess,
  getPrevStatisticsFail,
  getNextStatistics,
  getNextStatisticsSuccess,
  getNextStatisticsFail,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
