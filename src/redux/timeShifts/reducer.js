import { createSlice } from "@reduxjs/toolkit";

export const timeShiftsReducer = createSlice({
    name: 'timeShiftsReducer',
    initialState: {
        shiftRequests: [],
        metaData: null,
        loading: false,
        error: null,
    },
    reducers: {

        addTimeShiftRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        addTimeShiftRequestSuccess: (state, action) => {
            state.loading = false;
        },
        addTimeShiftRequestFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        getTimeShiftRequests: (state) => {
            state.metaData = null;
            state.loading = true;
            state.error = null;
        },
        getTimeShiftRequestsSuccess: (state, action) => {
            state.shiftRequests = action.payload.data;
            delete action.payload.data;
            state.metaData = action.payload.meta;
            state.loading = false;
        },
        getTimeShiftRequestsFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        acceptTimeShiftRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        acceptTimeShiftRequestSuccess: (state, action) => {
            let requests = state.shiftRequests.map(r => {
                if (r.shift_req_id === action.payload.shift_req_id) {
                    r.req_stat = action.payload.req_stat;
                }
                return r;
            });

            state.loading = false;
            state.shiftRequests = requests;
        },
        acceptTimeShiftRequestFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        rejectTimeShiftRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        rejectTimeShiftRequestSuccess: (state, action) => {
            let requests = state.shiftRequests.map(r => {
                if (r.shift_req_id === action.payload.shift_req_id) {
                    r.req_stat = action.payload.req_stat;
                }
                return r;
            });

            state.loading = false;
            state.shiftRequests = requests;
        },
        rejectTimeShiftRequestFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    addTimeShiftRequest,
    addTimeShiftRequestSuccess,
    addTimeShiftRequestFailed,
    getTimeShiftRequests,
    getTimeShiftRequestsSuccess,
    getTimeShiftRequestsFailed,
    acceptTimeShiftRequest,
    acceptTimeShiftRequestSuccess,
    acceptTimeShiftRequestFailed,
    rejectTimeShiftRequest,
    rejectTimeShiftRequestSuccess,
    rejectTimeShiftRequestFailed,
} = timeShiftsReducer.actions;

export default timeShiftsReducer.reducer;