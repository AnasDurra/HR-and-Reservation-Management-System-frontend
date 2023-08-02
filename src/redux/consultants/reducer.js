import { createSlice } from "@reduxjs/toolkit";

export const consultantsReducer = createSlice({
    name: 'consultantsReducer',
    initialState: {
        consultants: [],
        consultant: null,
        metaData: null,
        loading: false,
        error: null,
    },
    reducers: {
        getConsultants: (state) => {
            state.consultant = null;
            state.loading = true;
            state.error = null;
        },
        getConsultantsSuccess: (state, action) => {
            state.consultants = action.payload.data;
            delete action.payload.data;
            state.metaData = action.payload.meta;
            state.loading = false;
        },
        getConsultantsFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        addConsultant: (state) => {
            state.consultant = null;
            state.loading = true;
            state.error = null;
        },
        addConsultantSuccess: (state, action) => {
            const consultantsAfterCreate = state.consultants.concat(action.payload);
            state.loading = false;
            state.consultants = consultantsAfterCreate;
        },
        addConsultantFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        deleteConsultant: (state) => {
            state.consultant = null;
            state.loading = true;
            state.error = null;
        },
        deleteConsultantSuccess: (state, action) => {
            const consultantsAfterDelete = state.consultants.filter((c) => c.id !== action.payload.id);
            state.consultants = consultantsAfterDelete;
            state.loading = false;
        },
        deleteConsultantFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        updateConsultant: (state) => {
            state.consultant = null;
            state.loading = true;
            state.error = null;
        },
        updateConsultantSuccess: (state, action) => {
            const consultantsAfterUpdate = state.consultants.map((c) => c.id !== action.payload.id ? c : action.payload);
            state.consultants = consultantsAfterUpdate;
            state.loading = false;
        },
        updateConsultantFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        getConsultant: (state) => {
            state.loading = true;
            state.error = null;
        },
        getConsultantSuccess: (state, action) => {
            state.consultant = action.payload;
            state.loading = false;
        },
        getConsultantFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    getConsultants,
    getConsultantsSuccess,
    getConsultantsFailed,
    addConsultant,
    addConsultantSuccess,
    addConsultantFailed,
    deleteConsultant,
    deleteConsultantSuccess,
    deleteConsultantFailed,
    updateConsultant,
    updateConsultantSuccess,
    updateConsultantFailed,
    getConsultant,
    getConsultantSuccess,
    getConsultantFailed
} = consultantsReducer.actions;

export default consultantsReducer.reducer;