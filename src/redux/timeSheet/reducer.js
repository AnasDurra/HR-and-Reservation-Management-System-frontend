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
            let record = state.timeSheetLog.find(
                t => t.emp_id === action.payload.leave_emp_id &&
                    t.attendance_date === action.payload.leave_date);

            let log = state.timeSheetLog.filter(t => t.attendance_id !== record.attendance_id);

            record.leaveBefore = action.payload?.leaveBefore;
            record['check_out.state'] = action.payload.leave_state;
            record['check_out.status'] = action.payload.leave_status;
            record['check_out_time'] = action.payload.leave_time;

            log.unshift(record);
            state.timeSheetLog = log;
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