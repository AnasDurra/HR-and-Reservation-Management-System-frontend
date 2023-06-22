import { createSlice } from "@reduxjs/toolkit";

export const employeesAbsencesReducer = createSlice({
    name: 'employeesAbsencesReducer',
    initialState: {
        absences: [],
        metaData: null,
        loading: false,
        error: null,
    },
    reducers: {
        getEmployeesAbsences: (state) => {
            state.loading = true;
            state.error = null;
        },
        getEmployeesAbsencesSuccess: (state, action) => {
            state.absences = action.payload.data;
            delete action.payload.data;
            state.metaData = action.payload.pagination;
            state.loading = false;
        },
        getEmployeesAbsencesFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        updateEmployeeAbsenceStatus: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateEmployeeAbsenceStatusSuccess: (state, action) => {
            let newAbsences = state.absences;
            newAbsences = newAbsences.map(a => a.absence_id === action.payload.absence_id ? action.payload : a);
            state.absences = newAbsences;
            state.loading = false;
        },
        updateEmployeeAbsenceStatusFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    getEmployeesAbsences,
    getEmployeesAbsencesSuccess,
    getEmployeesAbsencesFailed,
    updateEmployeeAbsenceStatus,
    updateEmployeeAbsenceStatusSuccess,
    updateEmployeeAbsenceStatusFailed,
} = employeesAbsencesReducer.actions;

export default employeesAbsencesReducer.reducer;