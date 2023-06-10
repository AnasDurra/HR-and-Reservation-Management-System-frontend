import { createSlice } from "@reduxjs/toolkit";

export const vacationsReducer = createSlice({
    name: 'vacationsReducer',
    initialState: {
        allVacations: [],
        metaData: null,
        loading: false,
        error: null,
    },
    reducers: {
        getAllVacations: (state) => {
            state.loading = true;
            state.error = null;
        },
        getAllVacationsSuccess: (state, action) => {
            state.allVacations = action.payload.data;
            delete action.payload.data;
            state.metaData = action.payload.meta;
            state.loading = false;
        },
        getAllVacationsFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        // addJobVacancy: (state) => {
        //     state.loading = true;
        //     state.error = null;
        // },
        // addJobVacancySuccess: (state, action) => {
        //     const jobVacanciesAfterCreate = state.jobVacancies.concat(action.payload);
        //     state.loading = false;
        //     state.jobVacancies = jobVacanciesAfterCreate;
        // },
        // addJobVacancyFailed: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // },

        // deleteJobVacancy: (state) => {
        //     state.loading = true;
        //     state.error = null;
        // },
        // deleteJobVacancySuccess: (state, action) => {
        //     const jobVacanciesAfterDelete = state.jobVacancies.filter((job) => job.id !== action.payload.id);
        //     state.jobVacancies = jobVacanciesAfterDelete;
        //     state.loading = false;
        // },
        // deleteJobVacancyFailed: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // },

        // updateJobVacancy: (state) => {
        //     state.loading = true;
        //     state.error = null;
        // },
        // updateJobVacancySuccess: (state, action) => {
        //     const jobVacanciesAfterUpdate = state.jobVacancies.map((job) => job.id !== action.payload.id ? job : action.payload);
        //     state.jobVacancies = jobVacanciesAfterUpdate;
        //     state.loading = false;
        // },
        // updateJobVacancyFailed: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // },
    }
});

export const {
    getAllVacations,
    getAllVacationsSuccess,
    getAllVacationsFailed
} = vacationsReducer.actions;

export default vacationsReducer.reducer;