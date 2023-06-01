import { createSlice } from "@reduxjs/toolkit";

export const timeSheetReducer = createSlice({
    name: 'timeSheetReducer',
    initialState: {
        timeSheetLog: [],
        metaData: null,
        loading: false,
        error: null,
    },
    reducers: {
        getTimeSheetLog: (state) => {
            state.loading = true;
            state.error = null;
        },
        getTimeSheetLogSuccess: (state, action) => {
            state.timeSheetLog = action.payload.data;
            delete action.payload.data;
            state.metaData = action.payload;
            state.loading = false;
        },
        getTimeSheetLogFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        addAttendanceRecord: (state) => {
            state.loading = true;
            state.error = null;
        },
        addAttendanceRecordSuccess: (state, action) => {
            state.loading = false;
            state.timeSheetLog.unshift(action.payload);
        },
        addAttendanceRecordFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        addLeaveRecord: (state) => {
            state.loading = true;
            state.error = null;
        },
        addLeaveRecordSuccess: (state, action) => {
            state.loading = false;
            // let log = state.timeSheetLog.filter(t => t.id !== action.payload.id);
            // log.unshift(action.payload);
            // state.timeSheetLog = log;
        },
        addLeaveRecordFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    getTimeSheetLog,
    getTimeSheetLogSuccess,
    getTimeSheetLogFailed,
    addAttendanceRecord,
    addAttendanceRecordSuccess,
    addAttendanceRecordFailed,
    addLeaveRecord,
    addLeaveRecordSuccess,
    addLeaveRecordFailed
} = timeSheetReducer.actions;

export default timeSheetReducer.reducer;