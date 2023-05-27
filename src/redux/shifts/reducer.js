import { createSlice } from "@reduxjs/toolkit";

export const shiftsReducer = createSlice({
    name: 'shiftsReducer',
    initialState: {
        shifts: [],
        loading: false,
        error: null,
    },
    reducers: {
        getShifts: (state) => {
            state.loading = true;
            state.error = null;
        },
        getShiftsSuccess: (state, action) => {
            state.shifts = action.payload;
            state.loading = false;
        },
        getShiftsFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        createShift: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        createShiftSuccess: (state, action) => {
            state.loading = false;
            state.shifts = state.shifts.concat(action.payload);
        },
        createShiftFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        deleteShift: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        deleteShiftSuccess: (state, action) => {
            state.loading = false;
            const shiftsAfterDelete = state.shifts.filter((shift) => shift.schedule_id !== action.payload.schedule_id);
            state.shifts = shiftsAfterDelete;
        },
        deleteShiftFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        updateShift: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        updateShiftSuccess: (state, action) => {
            state.loading = false;
            const shiftsAfterUpdate = state.shifts.map((shift) => shift.schedule_id !== action.payload.schedule_id ? shift : action.payload);
            state.shifts = shiftsAfterUpdate;
        },
        updateShiftFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    getShifts,
    getShiftsSuccess,
    getShiftsFailed,
    createShift,
    createShiftSuccess,
    createShiftFailed,
    deleteShift,
    deleteShiftSuccess,
    deleteShiftFailed,
    updateShift,
    updateShiftSuccess,
    updateShiftFailed
} = shiftsReducer.actions;

export default shiftsReducer.reducer;