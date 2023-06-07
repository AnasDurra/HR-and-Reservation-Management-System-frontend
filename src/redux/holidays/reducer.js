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
            // state.holidays = action.payload;
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
            // state.holidays = action.payload;
            state.loading = false;
        },
        deleteHolidayFailed: (state, action) => {
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
} = holidaysReducer.actions;

export default holidaysReducer.reducer;