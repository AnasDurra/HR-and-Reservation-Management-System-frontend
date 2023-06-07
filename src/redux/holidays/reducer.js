import { createSlice } from "@reduxjs/toolkit";

export const holidaysReducer = createSlice({
    name: 'holidaysReducer',
    initialState: {
        holidays: [],
        loading: false,
        error: null,
    },
    reducers: {
        getHolidays: (state) => {
            state.loading = true;
            state.error = null;
        },
        getHolidaysSuccess: (state, action) => {
            state.holidays = action.payload;
            state.loading = false;
        },
        getHolidaysFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        addHoliday: (state) => {
            state.loading = true;
            state.error = null;
        },
        addHolidaySuccess: (state, action) => {
            const holidaysAfterAdd = state.holidays;
            holidaysAfterAdd.unshift(action.payload);
            state.holidays = holidaysAfterAdd;
            state.loading = false;
        },
        addHolidayFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        deleteHoliday: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteHolidaySuccess: (state, action) => {
            let holidaysAfterDelete = state.holidays;
            holidaysAfterDelete = holidaysAfterDelete.filter(h => h.holiday_id !== action.payload.holiday_id);
            state.holidays = holidaysAfterDelete;
            state.loading = false;
        },
        deleteHolidayFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        updateHoliday: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateHolidaySuccess: (state, action) => {
            let holidaysAfterUpdate = state.holidays;
            holidaysAfterUpdate = holidaysAfterUpdate.map(h => h.holiday_id !== action.payload.holiday_id ? h : action.payload);
            state.holidays = holidaysAfterUpdate;
            state.loading = false;
        },
        updateHolidayFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    getHolidays,
    getHolidaysSuccess,
    getHolidaysFailed,
    addHoliday,
    addHolidaySuccess,
    addHolidayFailed,
    deleteHoliday,
    deleteHolidaySuccess,
    deleteHolidayFailed,
    updateHoliday,
    updateHolidaySuccess,
    updateHolidayFailed
} = holidaysReducer.actions;

export default holidaysReducer.reducer;